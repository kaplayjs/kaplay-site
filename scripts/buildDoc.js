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
const stmts = transform(f.statements, (k, v) => {
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
const sections = [{
    name: "Start",
    entries: ["kaboom"],
}];

const isFile = (path) =>
    fs.stat(path).then((stat) => stat.isFile()).catch(() => false);

for (const stmt of stmts) {
    if (!types[stmt.name]) {
        types[stmt.name] = [];
    }

    types[stmt.name].push(stmt);

    if (stmt.name === "KaboomCtx") {
        if (stmt.kind !== "InterfaceDeclaration") {
            throw new Error("KaboomCtx must be an interface.");
        }

        for (const name in stmt.members) {
            const mem = stmt.members[name];
            const tags = mem[0].jsDoc?.tags ?? {};

            if (tags["section"]) {
                const name = tags["section"][0];
                const docPath = path.resolve(`doc/sections/${name}.md`);
                sections.push({
                    name: name,
                    entries: [],
                    doc: await isFile(docPath)
                        ? await fs.readFile(docPath, "utf8")
                        : null,
                });
            }

            const curSection = sections[sections.length - 1];

            if (name && !curSection.entries.includes(name)) {
                curSection.entries.push(name);
            }
        }
    }
}

await fs.writeFile(
    "doc.json",
    JSON.stringify({
        types,
        sections,
    }),
);

console.log("doc built");
