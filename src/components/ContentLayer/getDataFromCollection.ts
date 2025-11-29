import type { CollectionKey } from "astro:content";
import guidesData from "~/content/guides/data.json";

interface CollectionData {
    groupsOrder: string[];
}

export const getDataFromCollection = (
    collection: CollectionKey,
): CollectionData => {
    switch (collection) {
        case "guides":
            return guidesData;
        default:
            return {
                groupsOrder: [],
            };
    }
};
