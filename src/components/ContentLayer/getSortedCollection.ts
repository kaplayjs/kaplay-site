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
            break;
        case "blog":
            (entriesArray as CollectionEntry<"blog">[]).sort(sortBlog)
                .reverse();
            break;

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
    const aSpecialValue = a.id == "kaplay" ? 0 : 1;
    const aPrefix = a.data.isCtx ? 0 : 1;
    const aSort = a.data.title;
    const aGroup = getOrderNumberInApiDocsGroup(a.data.group);
    const aLocal = `${aSpecialValue}-${aGroup}-${aPrefix}-${aSort}`;

    const bSpecialValue = b.id == "kaplay" ? 0 : 1;
    const bPrefix = b.data.isCtx ? 0 : 1;
    const bSort = b.data.title;
    const bGroup = getOrderNumberInApiDocsGroup(b.data.group);
    const bLocal = `${bSpecialValue}-${bGroup}-${bPrefix}-${bSort}`;

    return aLocal.localeCompare(bLocal, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

export function sortBlog(
    a: CollectionEntry<"blog">,
    b: CollectionEntry<"blog">,
) {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
}

export function getOrderNumberInApiDocsGroup(group?: string) {
    if (!group) return 999;
    return apiDocData.groupsOrder.indexOf(group);
}

export function getOrderNumberGuidesDocsGroup(group?: string) {
    if (!group) return 999;
    return guidesData.groupsOrder.indexOf(group);
}
