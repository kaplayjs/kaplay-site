import prefixVersionUrl from "@/util/prefixVersionUrl";
import { assets } from "@kaplayjs/crew";

export interface NavbarLink {
    name: string;
    url: string;
    icon: string;
    target?: string;
    reload?: boolean;
    highlight?: "support" | "docs" | false;
    dropdown?: {
        name: string;
        url: string;
        icon: string;
        target?: string;
        reload?: boolean;
    }[];
}

export default {
    firstLinksRow: [
        {
            name: "Home",
            url: "/",
            icon: assets.bean.outlined,
        },
        {
            name: "Assets",
            url: "/crew",
            icon: assets.assetbrew.outlined,
        },
        {
            name: "Playground",
            url: "https://play.kaplayjs.com",
            icon: assets.bobo.outlined,
        },
    ],
    secondLinksRow: [
        {
            name: "Blog",
            url: "/blog",
            icon: assets.paper.outlined,
        },
        {
            name: "Support",
            url: "https://opencollective.com/kaplay",
            highlight: "support",
            icon: assets.heart.outlined,
            target: "_blank",
        },
        {
            name: "Docs",
            url: "/docs/guides/",
            highlight: "docs",
            icon: assets.api_book.outlined,
            dropdown: [
                {
                    name: "Guides",
                    url: "/docs/guides/",
                    icon: assets.marks_legend.outlined,
                },
                {
                    name: "API Reference",
                    url: "/docs/api/",
                    icon: assets.api_book.outlined,
                },
                {
                    name: "v4000",
                    url: prefixVersionUrl("/next"),
                    icon: assets.fire.outlined,
                },
            ],
        },
    ],
} as {
    firstLinksRow: NavbarLink[];
    secondLinksRow: NavbarLink[];
};
