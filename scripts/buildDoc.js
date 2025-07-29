import fs from "fs/promises";
import ts from "typescript";

console.log("building doc...");

// generate .d.ts / docs data
let dts = await fs.readFile(`kaplay/dist/doc.d.ts`, "utf-8");

const f = ts.createSourceFile("ts", dts, ts.ScriptTarget.Latest, true);

/**
 * @param {*} o
 * @param {*} f
 * @returns {Record<string, any>} Object
 */
function transform(o, f) {
    for (const k in o) {
        if (o[k] == null) {
            continue;
        }
        const v = f(k, o[k]);
        if (v != null) {
            o[k] = v;
        } else {
            delete o[k];
        }
        if (typeof o[k] === "object") {
            transform(o[k], f);
        }
    }

    return o;
}

// transform and prune typescript ast to a format more meaningful to us
const statements = transform(f.statements, (k, v) => {
    switch (k) {
        case "end":
        case "flags":
        case "parent":
        case "transformFlags":
        case "modifierFlagsCache":
        case "id":
            return;
        case "name":
        case "typeName":
        case "tagName":
            return v.escapedText;
        case "pos":
            return typeof v === "number" ? undefined : v;
        case "kind":
        case "operator":
            return ts.SyntaxKind[v];
        case "questionToken":
            return true;
        case "members": {
            const members = {};
            for (const mem of v) {
                const name = mem.name?.escapedText;
                if (!name || name === "toString") {
                    continue;
                }
                if (!members[name]) {
                    members[name] = [];
                }
                members[name].push(mem);
            }
            return members;
        }
        case "jsDoc": {
            const doc = v[0];
            const taglist = doc.tags ?? [];
            const tags = {};
            for (const tag of taglist) {
                const name = tag.tagName.escapedText;
                if (!tags[name]) {
                    tags[name] = [];
                }
                tags[name].push(tag.comment);
            }
            return {
                doc: doc.comment,
                tags: tags,
            };
        }
        default:
            return v;
    }
});

// modify statements to make it more readable
for (const statement of statements) {
    if (!statement.name === undefined) continue;

    if (statement.kind === "FirstStatement") {
        const declaration = statement.declarationList.declarations[0];

        statements.push({
            ...statement,
            ...declaration,
            kind: "FunctionDeclaration",
            name: declaration.name,
            jsDoc: statement.jsDoc,
        });
    }
}

// contain the type data for doc gen
const types = {};
let groups = {};

// Group Data
try {
    let groupsData = await fs.readFile(`kaplay/data/groups.json`, "utf-8");
    let groupsJson = JSON.parse(groupsData);

    const generateEntries = (obj, key) => {
        const object = obj[key];

        object.entries = [];
        if (!object.subgroups) object.subgroups = {};

        if ("subgroups" in object) {
            for (const key of Object.keys(object.subgroups)) {
                generateEntries(object.subgroups, key);
            }
        }
    };

    for (const key of Object.keys(groupsJson)) {
        generateEntries(groupsJson, key);
    }

    groups = groupsJson;
} catch (e) {
    console.log(e);
}

let groupedItems = [];

// #region Register Smt
/**
 * @param {string} name
 * @param {string} groupName
 * @param {string} subgroupName
 */
const registerEntry = (name, groupName, subgroupName) => {
    if (groupedItems.includes(name)) return;

    if (groupName && groupName !== "Misc") {
        let group = groups[groupName];
        let subGroup = group?.subgroups?.[subgroupName];

        if (!group) {
            group = {
                name: groupName,
                entries: [],
                subgroups: {},
            };

            groups[groupName] = group;
        }

        if (subgroupName && !subGroup) {
            subGroup = {
                name: subgroupName,
                entries: [],
                subgroups: {},
            };

            group.subgroups[subgroupName] = subGroup;
        }

        if (subgroupName) {
            group.subgroups[subgroupName].entries.push(name);
        } else {
            group.entries.push(name);
        }
    } else {
        groups["Misc"].entries.push(name);
    }

    groupedItems.push(name);
};

const IGNORE_ENTRIES = [
    "KAPLAYCtx",
    "KaboomCtx",
];

const registerStatement = (stmnt) => {
    const tags = stmnt.jsDoc?.tags ?? {};
    if (Array.isArray(tags["ignore"])) return;

    const name = stmnt.name;
    const groupName = tags["group"]?.[0];
    const subgroupName = tags["subgroup"]?.[0];

    if (!types[stmnt.name]) {
        types[stmnt.name] = [];
    }

    types[stmnt.name].push(stmnt);

    if (IGNORE_ENTRIES.includes(name)) return;

    registerEntry(name, groupName, subgroupName);
};

// #endregion

// #region Register `kaplay`

const kaplayStatement = Object.values(statements).find((s) =>
    s.name === "kaplay" || s.name === "kaboom"
);

registerStatement(kaplayStatement);

// #region Register `KAPLAYCtx` members
const kaplayCtxStatement = Object.values(statements).find((s) =>
    s.name === "KAPLAYCtx" || s.name === "KaboomCtx"
);

registerStatement(kaplayCtxStatement);

for (const statName in kaplayCtxStatement.members) {
    const mem = kaplayCtxStatement.members[statName];
    registerStatement(mem[0]);
}
// #endregion

for (const statement of statements) {
    if (
        statement.name === undefined
        || statement.name === "KAPLAYCtx"
        || statement.name === "KaboomCtx"
        || statement.name === "kaplay"
        || statement.name === "kaboom"
    ) {
        continue;
    }

    registerStatement(statement);
}

await fs.writeFile(
    "doc.json",
    JSON.stringify({
        types,
        groups,
    }),
);

await fs.writeFile(
    "public/doc.json",
    JSON.stringify({
        types,
        groups,
    }),
);
