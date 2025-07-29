import doc from "@/../doc.json";
import guidesData from "@/../guides/data.json";
import { booksInfo } from "@/data/booksData";
import {
    getCollection,
    type InferEntrySchema,
    type RenderedContent,
} from "astro:content";
import type { SidebarFolderData, SidebarItemData } from "./Sidebar.astro";

type Category = keyof typeof guidesData.categories;

const version = __KAPLAY_MAJOR__;
const allDoc = doc.types as any;

export const getGuidesEntries = async () => {
    const guides = (await getCollection("guides")).filter(filterGuides);
    const categories = Object.keys(guidesData.categories);

    const sortedGuides: SidebarItemData[] = guides.sort(sortGuides).map((
        guide,
    ) => ({
        kind: "Item",
        description: guide.data.description,
        name: guide.data.title,
        link: `/guides/${guide.data.url ?? guide.id.split("/")[2]}`,
        folder: guide.id.split("/")[1],
    }));

    const guidesByCategory = Object.groupBy(sortedGuides, (guide) => {
        return guide.folder ?? "no-folder";
    });

    const renderList: SidebarFolderData[] = categories.map((category) => {
        return {
            kind: "Folder",
            name: guidesData.categories[<Category> category].displayName,
            entries: guidesByCategory[category] ?? [],
        };
    });

    return renderList;
};

export const getBlogEntries = async () => {
    let renderList: SidebarFolderData[] = [];

    const guides = await getCollection("blog");
    const sortedEntries = guides
        .sort(
            (a, b) =>
                new Date(a.data.date).getTime()
                - new Date(b.data.date).getTime(),
        )
        .reverse();

    renderList = [
        {
            kind: "Folder",
            name: "Blog",
            entries: sortedEntries.map((entry: any) => ({
                kind: "Item",
                name: entry.data.title,
                link: `/blog/${entry.slug}`,
                description: "",
            })),
        },
    ];

    return renderList;
};

export const getBookEntries = async () => {
    let renderList: SidebarFolderData[] = [];

    const books = await getCollection("books");
    const sortedBooks = books.sort((a, b) => a.data.chapter - b.data.chapter);

    const booksByCategory = sortedBooks.reduce(
        (acc, book) => {
            const [_, folder] = book.slug.split("/");
            const folderName = folder;

            if (!acc[folderName]) {
                acc[folderName] = [];
            }

            acc[folderName].push(book);

            return acc;
        },
        {} as Record<string, any>,
    );

    renderList = [
        ...Object.keys(booksByCategory).map((category) => ({
            kind: "Folder",
            name: booksInfo[category].title ?? category,
            entries: booksByCategory[category].map((book: any) => ({
                kind: "Item",
                title: book.data.title,
                link: `/books/${book.slug.split("/")[1]}/${
                    book.slug.split("/")[2]
                }`,
                description: "",
            })),
        })),
    ];

    return renderList;
};

const getDocEntryDescription = (item: string) => {
    const docObjs = allDoc.KaboomCtx?.[0].members[item]
        ?? allDoc.KAPLAYCtx?.[0].members[item]
        ?? allDoc[item];
    const docObj = docObjs[0];
    const docDesc = getDocDescription(docObj?.jsDoc?.doc);

    return docDesc;
};

const getDocDescription = (item: unknown) => {
    if (typeof item === "string") {
        return item;
    } else if (Array.isArray(item)) {
        return item.map((part: any) => part.text).join("");
    }

    return "";
};

export const getDocEntries = async () => {
    const renderList: SidebarFolderData[] = [];
    const ctxMembers = Object.keys(
        allDoc.KaboomCtx?.[0].members ?? allDoc.KAPLAYCtx?.[0].members,
    );
    const groups = doc.groups as any;
    const groupsKeys = Object.keys(doc.groups) as string[];

    const getItems = (entries: string[]): SidebarItemData[] => {
        return entries.map((item) => {
            // Check if there's a global version of that Type,
            // it works for example for prefer `Rect` over `KAPLAYCtx.Rect`
            const isGlobal = allDoc[item] != null;
            let asCtxMember = ctxMembers.includes(item);

            if (isGlobal) {
                asCtxMember = false;
            }

            return {
                kind: "Item",
                name: item,
                link: asCtxMember ? `/doc/ctx/${item}` : `/doc/${item}`,
                description: `${getDocEntryDescription(item)}`,
            };
        });
    };

    groupsKeys.map((groupKey) => {
        const group = groups[groupKey];
        let rootItems = getItems(group.entries);
        let otherFolders: SidebarFolderData[] = [];

        Object.keys(group.subgroups).forEach((subGroupKey) => {
            const subgroup = group.subgroups[subGroupKey];

            otherFolders.push({
                entries: getItems(
                    subgroup.entries,
                ),
                kind: "Folder",
                name: subgroup.name,
                opened: subgroup.closed ? false : true,
            } as SidebarFolderData);
        });

        renderList.push({
            kind: "Folder",
            name: group.name,
            opened: group.closed ? false : true,
            entries: [...rootItems, ...otherFolders],
        });
    });

    return renderList;
};

// #region Sorter & Filter functions
type GuideEntry = {
    id: string;
    body?: string;
    collection: "guides";
    data: InferEntrySchema<"guides">;
    rendered?: RenderedContent;
    filePath?: string;
};

export function sortGuides(a: GuideEntry, b: GuideEntry) {
    const aSlug = a.id.split("/");
    const aCategory = aSlug[1];
    const aTitle = a.data.url ?? aSlug[2];
    const aSort = a.data.order ?? "zzz";
    const aLocal = `${aCategory}-${aSort}-${aTitle}`;

    const bSlug = b.id.split("/");
    const bCategory = bSlug[1];
    const bTitle = b.data.url ?? bSlug[2];
    const bSort = b.data.order ?? "zzz";
    const bLocal = `${bCategory}-${bSort}-${bTitle}`;

    return aLocal.localeCompare(bLocal, undefined, {
        numeric: true,
        sensitivity: "base",
    });
}

function filterByVersion(entry: {
    data: InferEntrySchema<"guides">;
}): boolean {
    const entryVersion = entry.data.version;

    if (!entryVersion) return true;

    return entryVersion == version;
}

const filterByHidden = (entry: {
    data: InferEntrySchema<"guides">;
}): boolean => {
    return !entry.data.hidden;
};

const filterGuides = (entry: {
    data: InferEntrySchema<"guides">;
}): boolean => {
    return filterByVersion(entry) && filterByHidden(entry);
};
// #endregion
