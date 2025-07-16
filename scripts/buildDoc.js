import fs from "fs/promises";
import ts from "typescript";

console.log("building doc...");

// generate .d.ts / docs data
let dts = await fs.readFile(`kaplay/dist/doc.d.ts`, "utf-8");

const f = ts.createSourceFile("ts", dts, ts.ScriptTarget.Latest, true);

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
    name: "Misc",
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
    "Misc",
];

const sectionsSort = {
    Start: ["kaplay", "quit", "KAPLAYOpt"],
};

for (const statement of statements) {
    if (!types[statement.name]) {
        types[statement.name] = [];
    }

    types[statement.name].push(statement);

    if (statement.name === undefined) continue;

    if (statement.name === "KAPLAYCtx" || statement.name === "KaboomCtx") {
        if (statement.kind !== "InterfaceDeclaration") {
            throw new Error("KAPLAYCtx must be an interface.");
        }

        for (const name in statement.members) {
            const mem = statement.members[name];
            const tags = mem[0].jsDoc?.tags ?? {};

            if (tags["group"]) {
                const name = tags["group"][0];

                if (!groups[name]) {
                    groups[name] = {
                        name: name,
                        entries: [mem[0].name],
                    };
                } else {
                    const section = groups[name];
                    section.entries.push(mem[0].name);
                }
            }
        }
    } else {
        const tags = statement.jsDoc?.tags ?? {};

        if (tags["group"]) {
            const name = tags["group"][0];

            if (!groups[name]) {
                groups[name] = {
                    name: name,
                    entries: [statement.name],
                };
            } else {
                const section = groups[name];
                section.entries.push(statement.name);
            }
        } else {
            miscGroup.entries.push(statement.name);
        }
    }

    groups["Misc"] = miscGroup;

    for (const group of groupsOrder) {
        sortedGroups[group] = groups[group];
    }

    for (const group of Object.keys(groups)) {
        if (!sortedGroups[group]) {
            sortedGroups[group] = groups[group];
        }
    }

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
}

await fs.writeFile(
    "doc.json",
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
