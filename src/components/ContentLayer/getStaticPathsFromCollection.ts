import type { Locale } from "@/util/i18n";
import { type CollectionKey, getCollection } from "astro:content";

export const getStaticPathsFromCollection = async <T extends CollectionKey>(
    collection: T,
    locale: Locale,
) => {
    const entries = await getCollection(collection, (entry) => {
        return entry.data.language === locale;
    });

    return entries.map((entry) => {
        return {
            props: {
                entry,
            },
            params: {
                slug: entry.id,
            },
        };
    });
};
