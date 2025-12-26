import fs from "fs/promises";
import path from "path";
import ts from "typescript";

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
const groups = {};
const sortedGroups = {};
const miscGroup = {
    name: "Miscalenous",
    entries: [],
};

const groupsOrder = [
    "Start",
    "Assets",
    "Game Obj",
    "Components",
    "Component Types",
    "Scene",
    "Input",
    "Events",
    "Info",
    "Timer",
    "Math",
];

const sectionsSort = {
    Start: ["kaplay", "quit", "KAPLAYOpt"],
};

let groupedItems = [];

// #region Register Smt
/**
 * @param {string} name
 * @param {boolean} isGrouped
 * @param {string} groupName
 */
const registerEntry = (name, isGrouped, groupName) => {
    if (groupedItems.includes(name)) return;

    if (isGrouped && groupName !== "Misc") {
        let group = groups[groupName];

        if (!group) {
            group = {
                name: groupName,
                entries: [],
            };

            groups[groupName] = group;
        }

        group.entries.push(name);
    } else {
        miscGroup.entries.push(name);
    }

    groupedItems.push(name);
};

// #endregion

// #region Register `KAPLAYCtx` members
const kaplayCtxStatement = Object.values(statements).find((s) =>
    s.name === "KAPLAYCtx" || s.name === "KaboomCtx"
);

for (const statName in kaplayCtxStatement.members) {
    const mem = kaplayCtxStatement.members[statName];
    const tags = mem[0].jsDoc?.tags ?? {};
    const name = mem[0].name;

    const isGrouped = Boolean(tags["group"]);
    const groupName = tags["group"]?.[0];

    registerEntry(name, isGrouped, groupName);
}
// #endregion

for (const statement of statements) {
    if (!types[statement.name]) {
        types[statement.name] = [];
    }

    types[statement.name].push(statement);

    if (statement.name === undefined) continue;

    if (statement.name === "KAPLAYCtx" || statement.name === "KaboomCtx") {
        continue;
    }

    const tags = statement.jsDoc?.tags ?? {};
    const name = statement.name;

    const isGrouped = Boolean(tags["group"]);
    const groupName = tags["group"]?.[0];

    registerEntry(name, isGrouped, groupName);
}

for (const group of groupsOrder) {
    sortedGroups[group] = groups[group];
}

for (const group of Object.keys(groups)) {
    if (!sortedGroups[group]) {
        sortedGroups[group] = groups[group];
    }
}

sortedGroups["Miscalenous"] = miscGroup;

for (const sectionOrder of Object.keys(sectionsSort)) {
    const section = sortedGroups[sectionOrder];
    if (!section) continue;

    const sortedEntries = [];
    for (const entry of sectionsSort[sectionOrder]) {
        const index = section.entries.indexOf(entry);
        if (index !== -1) {
            sortedEntries.push(section.entries[index]);
            section.entries.splice(index, 1);
        }
    }

    section.entries = sortedEntries.concat(section.entries);
}

const compMap = {};

for (const comp of groups["Components"].entries) {
    if (comp.substring(0, 1) === comp.substring(0, 1).toLowerCase()) {
        const contextEntries = types.KAPLAYCtx[0].members;
        const returnType = contextEntries[comp]?.[0]?.type?.typeName;

        if (returnType) {
            compMap[comp] = returnType;
        }
    }
}

await fs.mkdir(path.dirname("src/data/generated/docs.json"), {
    recursive: true,
});
await fs.writeFile(
    "src/data/generated/docs.json",
    JSON.stringify({
        types,
        groups: sortedGroups,
    }),
);

await fs.writeFile(
    "public/doc.json",
    JSON.stringify({
        types,
        groups: sortedGroups,
    }),
);

await fs.writeFile(
    "src/data/generated/comps.json",
    JSON.stringify({
        compMap,
    }),
);
