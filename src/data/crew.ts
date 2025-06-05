import { highlight } from "@/util/highlight";
import { assets, type CrewItemBase } from "@kaplayjs/crew";

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

export { crew as assets };
export default crew;
