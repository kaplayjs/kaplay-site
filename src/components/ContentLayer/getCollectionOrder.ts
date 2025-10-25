import type { Locale } from "@/util/i18n";
import { type CollectionKey, getCollection } from "astro:content";

export interface CollectionListElement {
    id: string;
    title: string;
    description: string;
    url: string;
    folder?: string;
    category?: string;
}

const collectionOrders: Record<
    CollectionKey,
    (locale: Locale) => Promise<CollectionListElement[]>
> = {
    "guides": async (locale) => {
        const entries = await getCollection("guides", (entry) => {
            return entry.data.language === locale;
        });

        const collectionList: CollectionListElement[] = entries.map((entry) => {
            return {
                id: entry.id,
                title: entry.data.title,
                description: entry.data.description,
                url: entry.data.url ?? entry.id.split("/")[2],
                folder: entry.id.split("/")[1],
                category: entry.data.category,
            };
        });

        return collectionList;
    },
    "blog": async (locale) => {
        const entries = await getCollection("blog", (entry) => {
            return entry.data.language === locale;
        });

        const collectionList: CollectionListElement[] = entries.map((entry) => {
            return {
                id: entry.id,
                title: entry.data.title,
                description: entry.data.description,
                url: entry.id,
            };
        });

        return collectionList;
    },
    "apiDocs": async (locale) => {
        const entries = await getCollection("apiDocs", (entry) => {
            return entry.data.language === locale;
        });

        const collectionList: CollectionListElement[] = entries.map((entry) => {
            return {
                id: entry.id,
                title: entry.data.title,
                description: entry.data.description,
                url: entry.id,
                folder: entry.data.folder,
            };
        });

        return collectionList;
    },
    "books": async () => {
        return [];
    },
    "misc": async () => {
        return [];
    },
};

export const getOrderFromCollection = async <T extends CollectionKey>(
    collection: T,
    locale: Locale,
) => {
    return collectionOrders[collection](locale);
};
