import kaplaySubmodulePackageJson from "../../kaplay/package.json";

export const isVersion: (
    version: string,
    requireToBeEqualIn?: "major" | "minor" | "patch",
) => boolean = (version, requireToBeEqualIn = "major") => {
    const [major, minor, patch] = kaplaySubmodulePackageJson.version.replace(
        /^(\d+\.\d+\.\d+).*/,
        "$1",
    ).split(".");
    const [checkMajor, checkMinor, checkPatch] = version.split(".");

    switch (requireToBeEqualIn) {
        case "major":
            return major === checkMajor;
        case "minor":
            return major === checkMajor && minor === checkMinor;
        case "patch":
            return patch === checkPatch && minor === checkMinor
                && patch === checkPatch;
    }
};

export default isVersion;
