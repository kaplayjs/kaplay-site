import type { Locale } from "@/util/i18n";
import translationStrings from "@/util/translationStrings";
import type { CollectionKey } from "astro:content";
import type {
    SidebarEntryCategory,
    SidebarEntryGroup,
} from "../Sidebar/Sidebar.types";
import { getSortedCollection } from "./getSortedCollection";

export const getSidebarEntriesFromCollection = async <T extends CollectionKey>(
    collection: T,
    category: string,
    locale: Locale,
): Promise<SidebarEntryCategory> => {
    const entries = await getSortedCollection(collection, locale);

    const entriesByCategory = Object.groupBy(entries, (e) => e.data.category!);

    if (category in entriesByCategory == false) {
        throw new Error(
            `The category ${category} doesn't exist in the collection ${collection}`,
        );
    }

    const categoryEntries = entriesByCategory[category]!; // <- checked above
    const entriesByGroup = Object.groupBy(
        categoryEntries,
        (e) => e.data.group!,
    );

    const groups: SidebarEntryGroup[] = Object.entries(entriesByGroup).map(
        ([group, items]) => {
            const groupName = collection == "guides"
                ? translationStrings[locale]["collections"][
                    collection as string
                ][
                    "groups"
                ][group]?.displayName
                : group;

            return {
                name: groupName,
                entries: items!.map((i) => {
                    return {
                        name: i.data.title,
                        url: i.data.url,
                    };
                }),
            } satisfies SidebarEntryGroup;
        },
    );

    return {
        name: category,
        groups: groups,
    };
};
