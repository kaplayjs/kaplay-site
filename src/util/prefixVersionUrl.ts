import isVersion from "./isVersion";

export const prefixVersionUrl: (
    url: string,
    version?: string,
) => string = (url, version = "4000") => {
    const subdomain = version != "3000" ? `v${version}.` : "";

    return (!isVersion(version) ? `https://${subdomain}kaplayjs.com/` : "/")
        + url.replace(/^\/|\/$/g, "") + "/";
};

export default prefixVersionUrl;
