import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGithub, { defaultBuildUrl } from "remark-github";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import kaplaySubmodulePackageJson from "../kaplay/package.json" with {
    type: "json",
};

const kaplayVersion = kaplaySubmodulePackageJson.version;
const changelogUrl =
    `https://raw.githubusercontent.com/kaplayjs/kaplay/refs/heads/master/CHANGELOG.md`;

const originalChangelog = await (await fetch(changelogUrl)).text();
let curKAPLAYVersion;

const changelogVersionHeadings = {
    "4000": "Changelog",
    "3001": "Changelog for v3001",
};

if (kaplayVersion.startsWith("4")) {
    curKAPLAYVersion = "4000";
} else {
    curKAPLAYVersion = "3001";
}

const versionHeading = changelogVersionHeadings[curKAPLAYVersion];

let result = await remark()
    .use(remarkParse)
    .use(() => tree => {
        const children = tree.children;

        let childCount = 0;
        const newChildren = [];
        let inSection = false;

        for (const node of children) {
            if (node.type === "heading" && node.depth === 1) {
                inSection = node.children[0].value === versionHeading;
            }

            if (inSection) {
                childCount++;

                if (childCount == 5 && curKAPLAYVersion == "4000") continue;

                newChildren.push(node);
            }
        }

        tree.children = newChildren;
    })
    .use(remarkStringify)
    .use(remarkGithub, {
        repository: "kaplayjs/kaplay",
    })
    .process(originalChangelog);

result = `---
title: Changelog
description: Know the latest feature in KAPLAY.
---\n\n` + result;

const changelogPath = path.resolve(
    "src",
    "content",
    "misc",
    "en",
    "changes.md",
);

fs.mkdirSync(path.dirname(changelogPath), { recursive: true });
fs.writeFileSync(changelogPath, String(result), "utf8");
