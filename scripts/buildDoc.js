import fs from "fs/promises";
import path from "path";
import ts from "typescript";

console.log("building doc...");

// generate .d.ts / docs data
let dts = await fs.readFile(`kaplay/src/types.ts`, "utf-8");

const f = ts.createSourceFile(
    "ts",
    dts,
    ts.ScriptTarget.Latest,
    true,
);

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
        case "modifiers":
        case "transformFlags":
        case "modifierFlagsCache":
            return;
        case "name":
        case "typeName":
        case "tagName":
            return v.escapedText;
        case "pos":
            return typeof v === "number" ? undefined : v;
        case "kind":
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

// contain the type data for doc gen
const types = {};
const groups = {};

for (const statement of statements) {
    if (!types[statement.name]) {
        types[statement.name] = [];
    }

    types[statement.name].push(statement);

    if (statement.name === "KaboomCtx") {
        if (statement.kind !== "InterfaceDeclaration") {
            throw new Error("KaboomCtx must be an interface.");
        }

        for (const name in statement.members) {
            const mem = statement.members[name];
            const tags = mem[0].jsDoc?.tags ?? {};

            if (tags["group"]) {
                const name = tags["group"][0];

                if (!groups[name]) {
                    groups[name] = {
                        name: name,
                        entries: [
                            mem[0].name,
                        ],
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
                    entries: [
                        statement.name,
                    ],
                };
            } else {
                const section = groups[name];
                section.entries.push(statement.name);
            }
        }
    }
}

await fs.writeFile(
    "doc.json",
    JSON.stringify({
        types,
        groups,
    }),
);
