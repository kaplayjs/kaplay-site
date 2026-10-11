import type { AstroIntegration } from "astro";
import { execSync } from "child_process";
import pc from "picocolors";
import kaplayPackageJson from "../kaplay/package.json";

export function buildSite(): AstroIntegration {
    return {
        name: "🦖",
        hooks: {
            "astro:config:setup"({ logger }) {
                const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

                if (isGitHubActions) {
                    logger.info(
                        `Skipping KAPLAY generation process, as not needed in Github Actions`,
                    );
                    return;
                }

                logger.info(`Generating docs.json from kaplay submodule...`);
                try {
                    execSync("npm run generate:docs");
                    logger.info(
                        `docs.json generated: ${
                            pc.blue("/src/data/generated/docs.json")
                        }`,
                    );
                } catch (e) {
                    logger.error("something happened\n\n" + e);
                }

                logger.info(`Generating contributors.json...`);
                try {
                    execSync("npm run generate:contributors");
                    logger.info(
                        `contributors.json generated: ${
                            pc.blue("/src/data/generated/contributors.json")
                        }`,
                    );
                } catch (e) {
                    logger.error("something happened\n\n" + e);
                }

                logger.info(`Generating changelog...`);
                try {
                    execSync("npm run generate:changelog");
                    logger.info(
                        `Changelog generated: ${
                            pc.blue("/src/content/misc/en/changes.md")
                        }`,
                    );
                } catch (e) {
                    logger.error("something happened\n\n" + e);
                }
            },
            "astro:build:start"({ logger }) {
                logger.info(
                    `Building website for KAPLAY version: ${
                        pc.blue(kaplayPackageJson.version)
                    }`,
                );
            },
        },
    };
}
