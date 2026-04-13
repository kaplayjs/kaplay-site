/**
 * Redirect docs to the preferred version on site navigation or exact endpoints
 * To be inlined in the head
 */
export default function redirectToPreferredVersion() {
    if (location.search.includes("noredirect")) {
        const url = new URL(location.href);
        url.searchParams.delete("noredirect");
        window.history.replaceState({}, "", url.href);
        return;
    }

    const refOrigin = document.referrer
        ? (new URL(document.referrer)).origin
        : "";
    const path = location.pathname.replace(/\/$/, "");
    if (
        !path.endsWith("/guides")
        && !path.endsWith("/api")
        && refOrigin != location.origin
    ) return;

    const getCookie = (name = "docsPreferredVersion") => {
        const match = document.cookie.match(
            new RegExp("(^|;\\s*)" + name + "=([^;]*)"),
        );
        return match ? decodeURIComponent(match[2]) : null;
    };

    const version = getCookie() || __KAPLAY_MAJOR__;
    const versionSubdomain = version != __KAPLAY_DEFAULT_VERSION__
        ? `v${version}.`
        : "";
    const subdomain = (() => {
        const parts = location.hostname.split(".");
        return parts.length > 2 ? `${parts[0]}.` : "";
    })();

    if (subdomain == versionSubdomain) return;

    const { host, pathname, search, hash } = window.location;
    const redirectHost = host.replace(subdomain, "");
    location.replace(
        `//${versionSubdomain}${redirectHost}${pathname}${search}${hash}`,
    );
}
