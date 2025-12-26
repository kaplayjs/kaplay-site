import fs from "fs/promises";
import contributors from "github-contributors";
import path from "path";

const dist = path.join("src", "data", "generated", "contributors.json");
await fs.mkdir(path.dirname(dist), { recursive: true });
let opts = {};

let contributorsList = new Map();

const registerContributors = (contributorsArray) => {
    contributorsArray.forEach(contributor => {
        contributorsList.set(contributor.id, contributor);
    });
};

const contributorsAndThen = (repo, then) => {
    contributors(repo, opts, (err, res) => {
        if (err) return console.log(err);

        const list = res.filter((u, i) => !u.login.endsWith("[bot]"));
        registerContributors(list);
        then();
    });
};

contributorsAndThen("kaplayjs/kaplay", () => {
    contributorsAndThen("kaplayjs/kaplayground", () => {
        contributorsAndThen("kaplayjs/kaplay-site", () => {
            fs.writeFile(
                dist,
                JSON.stringify(Array.from(contributorsList.values()), null, 2),
                (err) => {
                    if (err) return console.log(err);
                },
            );
        });
    });
});
