import type { Locale } from "@/util/i18n.ts";
import { assets } from "@kaplayjs/crew";

interface NavbarLink {
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

type NavbarLinksRow = Record<Locale, NavbarLink[]>;

export const firstLinksRow: NavbarLinksRow = {
    "en": [
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
    "es": [
        {
            name: "Inicio",
            url: "/",
            icon: assets.bean.outlined,
        },
        {
            name: "Pandilla",
            url: "/crew",
            icon: assets.assetbrew.outlined,
        },
        {
            name: "Playground",
            url: "https://play.kaplayjs.com",
            icon: assets.bobo.outlined,
        },
    ],
};

export const secondLinksRow: NavbarLinksRow = {
    "en": [
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
            ],
        },
    ],
    "es": [
        {
            name: "Blog",
            url: "/blog",
            highlight: false,
            icon: assets.paper.outlined,
        },
        {
            name: "Donar",
            url: "https://opencollective.com/kaplay",
            highlight: false,
            icon: assets.heart.outlined,
            target: "_blank",
        },
        {
            name: "Docs (EN)",
            url: "/docs/guides/",
            highlight: "docs",
            icon: assets.api_book.outlined,
            dropdown: [
                {
                    name: "Guías (EN)",
                    url: "/docs/guides/",
                    icon: assets.marks_legend.outlined,
                },
                {
                    name: "API (EN)",
                    url: "/docs/api/",
                    icon: assets.api_book.outlined,
                },
            ],
        },
    ],
};
