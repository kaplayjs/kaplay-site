import type { Locale } from "@/util/i18n";
import type { CollectionEntry, CollectionKey } from "astro:content";
import { getSortedCollection } from "./getSortedCollection";

export const getCollectionPreviousAndNext = async <T extends CollectionKey>(
    collection: T,
    entry: CollectionEntry<T>,
    locale: Locale,
) => {
    const entries = await getSortedCollection(collection, locale);
    const currentIndex = entries.findIndex((e) => e.id === entry.id);

    const previousEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
    const nextEntry = currentIndex < entries.length - 1
        ? entries[currentIndex + 1]
        : null;

    return {
        previous: previousEntry,
        next: nextEntry,
    };
};
