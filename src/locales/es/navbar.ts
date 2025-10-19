import prefixVersionUrl from "@/util/prefixVersionUrl";
import { assets } from "@kaplayjs/crew";
import type { NavbarLink } from "../en/navbar";

export default {
    firstLinksRow: [{
        name: "Inicio",
        url: "/",
        icon: assets.bean.outlined,
    }, {
        name: "Pandilla",
        url: "/crew",
        icon: assets.assetbrew.outlined,
    }, {
        name: "Playground",
        url: "https://play.kaplayjs.com",
        icon: assets.bobo.outlined,
    }],
    secondLinksRow: [
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
