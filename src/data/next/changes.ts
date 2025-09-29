import { type SpriteCrewAsset } from "@kaplayjs/crew";

export const changes: {
    title: string;
    description?: string;
    icon: SpriteCrewAsset;
    guide?: {
        url: string;
        label?: string;
    };
    links?: {
        name: string;
        url: string;
    }[];
}[] = [
    {
        title: "Performance Improvements",
        description:
            "With underlying systems updated comes the greatly improved performance, most notably in objects/area-heavy games",
        icon: "lightning",
    },
    {
        title: "Global Z-index Sorting",
        description:
            "Objects using `z()` are now sorted globally, meaning any child can be drawn above any parent siblings, or any object (within the same layer)",
        icon: "ghosty",
    },
    {
        title: "GJK as default collision algo replacing SAT",
        description:
            "<abbr class=\"tooltip underline decoration-1 decoration-dotted decoration-base-content/25\" data-tip=\"Gilbert-Johnson-Keerthi\">GJK</abbr> is faster and more versatile algorithm allowing any shape unlike <abbr class=\"tooltip underline decoration-1 decoration-dotted decoration-base-content/25\" data-tip=\"Separating Axis Theorem\">SAT</abbr>. Can be reverted with `narrowPhaseCollisionAlgorithm` option",
        icon: "grass",
        links: [
            {
                name: "KAPLAY Option",
                url: "https://v4000.kaplayjs.com/docs/api/KAPLAYOpt/#KAPLAYOpt-narrowPhaseCollisionAlgorithm",
            },
        ],
    },
    {
        title: "make() removed / replaced with Prefabs",
        description:
            "Make was a friend, but a rebel too that had to be removed. Nothing what a simple factory function wouldn't solve or more robust prefabs",
        icon: "cross_mark",
        links: [
            {
                name: "RIP make()",
                url: "https://kaplayjs.com/docs/api/ctx/make/",
            },
            {
                name: "Creating Objects",
                url: "https://v4000.kaplayjs.com/docs/guides/game_objects/#creating-game-object-dynamically",
            },
        ],
    },
    {
        title: "Tags separated from Components",
        description:
            "Component IDs are no longer tags. But, instead of `obj.is(\"sprite\")` you can use `obj.has(\"sprite\")`. Can be reverted with `tagComponentIds` option",
        icon: "pencil",
        links: [
            {
                name: "KAPLAY Option",
                url: "https://v4000.kaplayjs.com/docs/api/KAPLAYOpt/#KAPLAYOpt-tagComponentIds",
            },
            {
                name: "is()",
                url: "https://v4000.kaplayjs.com/docs/api/GameObjRaw/#GameObjRaw-is",
            },
            {
                name: "has()",
                url: "https://v4000.kaplayjs.com/docs/api/GameObjRaw/#GameObjRaw-has",
            },
        ],
    },
    {
        title: "API Changes & Improvements",
        icon: "api_book",
        description:
            "There were many changes to the API, mainly as a quality of life improvements or little options and features added here and there, that didn't make it back to the v3001",
        guide: {
            label: "Learn more in Migration Guide",
            url: "https://v4000.kaplayjs.com/docs/guides/migration-4000/",
        },
    },
];
