import fs from "fs";
import contributors from "github-contributors";

const repo = "kaplayjs/kaplay";
const dist = "src/data/contributors.json";
let opts = {};

contributors(repo, opts, (err, res) => {
    if (err) return console.log(err);

    const contributors = res.filter((u, i) => !u.login.endsWith("[bot]"));

    fs.writeFile(dist, JSON.stringify(contributors, null, 2), (err) => {
        if (err) return console.log(err);
        console.log(`Contributors list has been saved to ${dist}`);
    });
});
