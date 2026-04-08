import isVersion from "./isVersion";

export const prefixVersionUrl: (
    url: string,
    version?: string,
) => string = (url, version = "4000") => {
    const isCurVersion = isVersion(version);
    const subdomain = version != __KAPLAY_DEFAULT_VERSION__
        ? `v${version}.`
        : "";

    const link = new URL(
        (!isCurVersion ? `https://${subdomain}kaplayjs.com/` : "/")
            + url.replace(/^\/|\/$/g, "") + "/",
        isCurVersion ? import.meta.env.SITE : undefined,
    );
    if (!isCurVersion) link.searchParams.append("noredirect", "");

    return link[isCurVersion ? "pathname" : "href"].replace(/=$|=(?=&)/g, "");
};

export default prefixVersionUrl;
