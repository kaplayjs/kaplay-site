import { highlight } from "@/util/highlight";
import {
    assets,
    type CrewAssetPack,
    type CrewItemBase,
    type Tag,
} from "@kaplayjs/crew";

type Asset = (typeof assets)[keyof typeof assets];

export type CrewItem = Asset & {
    imports: {
        [key: string]: {
            original: string;
            outlined: string;
        };
    };
};

export interface Crew {
    [key: string]: CrewItem;
}

const crew: Crew = {};

for (const [key, value] of Object.entries(assets).sort()) {
    crew[key] = {
        ...value,
        imports: Object.fromEntries(
            await Promise.all(
                Object.entries(value.imports).map(async ([k, v]) => {
                    return [k, {
                        original: await highlight(v),
                        outlined: await highlight(
                            v.replaceAll(key, `${key}-o`),
                        ),
                    }];
                }),
            ),
        ),
    };
}

export type originOptions = "All" | CrewItemBase["origin"];
export const originOptions = [
    "All",
    ...(new Set(
        Object.values(crew).map(asset => asset.origin || "All"),
    ).values()),
];
export const countByOrigin = (origin: originOptions) =>
    origin === "All" ? Object.keys(crew).length : Object.values(crew).filter(
        asset => asset.origin === origin,
    ).length;

export type typeOptions = "All" | CrewItemBase["type"];
export const typeOptions = [
    "All",
    ...(new Set(
        Object.values(crew).map(asset => asset.type || "All"),
    ).values()),
];
export const countByType = (type: typeOptions) =>
    type === "All" ? Object.keys(crew).length : Object.values(crew).filter(
        asset => asset.type === type,
    ).length;

export const tags: Tag[] = [
    ...(new Set(
        Object.values(crew).map(asset => asset.tags).flat(),
    ).values()),
].sort();

type crewPacksOrdered = CrewAssetPack | "Other";
const crewPacksOrdered: crewPacksOrdered[] = [
    "KAWorld",
    "Icons",
    "Emojis",
    "Brand",
];
export const crewPacks: crewPacksOrdered[] = [
    ...crewPacksOrdered,
    ...(Object.values(crew).map(asset => asset.pack).filter((
        pack: crewPacksOrdered,
    ) => !crewPacksOrdered.includes(pack) && pack != "Other")),
    "Other",
] as const;

export const tagsMessages = {
    "kaworld": "Welcome to KAWorld, the KAPLAYER's home :D",
    "crew": "The protagonists of your next adventure",
    "objects": "Objects of power",
    "animals": "Yokai, Yokai, Yokai...",
    "food": "YUMMY",
    "tiles": "Make Super Bean Maker a reality.",
    "icons": "Used on this web :D",
    "books": "Explore more books at: kaplayjs.com/books",
    "brand": "KAPLAY brand related logos, assets",
    "ui": "*Click*",
    "emojis": "More in Discord!",
    "fonts": "Sad font coming soon...",
} satisfies Record<typeof tags[number] | "kaworld", string>;

export { crew as assets };
export default crew;
