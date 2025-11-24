import type { Locale } from "@/util/i18n";
import {
    type CollectionEntry,
    type CollectionKey,
    getCollection,
} from "astro:content";

import apiDocData from "~/content/apiDoc/data.json";
import guidesData from "~/content/guides/data.json";

export const getSortedCollection = async <T extends CollectionKey>(
    collection: T,
    locale?: Locale,
): Promise<CollectionEntry<T>[]> => {
    const entries = await getCollection(collection, (entry) => {
        if (!locale || !entry.data.language) return true;
        return entry.data.language === locale;
    });

    const entriesArray: CollectionEntry<T>[] = Object.values(entries);

    switch (collection) {
        case "guides":
            (entriesArray as CollectionEntry<"guides">[]).sort(sortGuides);
            break;
        case "apiDocs":
            (entriesArray as CollectionEntry<"apiDocs">[]).sort(sortApiDocs);

        default:
            break;
    }

    return entriesArray;
};

// Sorting Functions

export function sortGuides(
    a: CollectionEntry<"guides">,
    b: CollectionEntry<"guides">,
) {
    const aGroup = getOrderNumberGuidesDocsGroup(a.data.group);
    const aTitle = a.data.title;
    const aSort = a.data.order ?? "zzz";
    const aLocal = `${aGroup}-${aSort}-${aTitle}`;

    const bGroup = getOrderNumberGuidesDocsGroup(b.data.group);
    const bTitle = b.data.title;
    const bSort = b.data.order ?? "zzz";
    const bLocal = `${bGroup}-${bSort}-${bTitle}`;

    return aLocal.localeCompare(bLocal, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

export function sortApiDocs(
    a: CollectionEntry<"apiDocs">,
    b: CollectionEntry<"apiDocs">,
) {
    const aPrefix = a.data.isCtx ? 0 : 1;
    const aSort = a.data.title;
    const aGroup = getOrderNumberInApiDocsGroup(a.data.group);
    const aLocal = `${aGroup}-${aPrefix}-${aSort}`;

    const bPrefix = b.data.isCtx ? 0 : 1;
    const bSort = b.data.title;
    const bGroup = getOrderNumberInApiDocsGroup(b.data.group);
    const bLocal = `${bGroup}-${bPrefix}-${bSort}`;

    return aLocal.localeCompare(bLocal, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

export function getOrderNumberInApiDocsGroup(group?: string) {
    if (!group) return 999;
    return apiDocData.groupsOrder.indexOf(group);
}

export function getOrderNumberGuidesDocsGroup(group?: string) {
    if (!group) return 999;
    return guidesData.groupsOrder.indexOf(group);
}
