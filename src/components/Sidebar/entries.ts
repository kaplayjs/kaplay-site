import doc from "@/data/generated/docs.json";
import guidesData from "@/../guides/data.json";
import { booksInfo } from "@/data/booksData";
import {
    getCollection,
    type InferEntrySchema,
    type RenderedContent,
} from "astro:content";
import type { LinkListEntry, SidebarEntry } from "./Sidebar.astro";

type Category = keyof typeof guidesData.categories;

const version = __KAPLAY_MAJOR__;
const allDoc = doc.types as any;

export const getGuidesEntries = async () => {
    const guides = (await getCollection("guides")).filter(filterGuides);
    const categories = Object.keys(guidesData.categories);

    const sortedGuides: LinkListEntry[] = guides.sort(sortGuides).map((
        guide,
    ) => ({
        id: guide.id,
        description: guide.data.description,
        title: guide.data.title,
        url: `/docs/guides/${guide.data.url ?? guide.id.split("/")[2]}`,
        folder: guide.id.split("/")[1],
    }));

    const guidesByCategory = Object.groupBy(sortedGuides, (guide) => {
        return guide.folder ?? "no-folder";
    });

    const renderList: SidebarEntry[] = categories.map((category) => {
        return {
            folder: guidesData.categories[<Category>category].displayName,
            linkList: guidesByCategory[category] ?? [],
        };
    });

    return renderList;
};

export const getBlogEntries = async () => {
    let renderList: SidebarEntry[] = [];

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
            folder: "Blog",
            linkList: sortedEntries.map((entry: any) => ({
                id: entry.id,
                title: entry.data.title,
                url: `/blog/${entry.slug}`,
                description: "",
            })),
        },
    ];

    return renderList;
};

export const getBookEntries = async () => {
    let renderList: SidebarEntry[] = [];

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
            folder: booksInfo[category].title ?? category,
            linkList: booksByCategory[category].map((book: any) => ({
                title: book.data.title,
                url: `/books/${book.slug.split("/")[1]}/${book.slug.split("/")[2]
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
    const renderList: SidebarEntry[] = [];
    const ctxMembers = Object.keys(
        allDoc.KaboomCtx?.[0].members ?? allDoc.KAPLAYCtx?.[0].members,
    );
    const groups = doc.groups as any;
    const groupsKeys = Object.keys(doc.groups) as string[];

    groupsKeys.map((groupName) => {
        let registeredElements: string[] = [];

        renderList.push({
            folder: groupName,
            linkList: groups[groupName].entries.filter((item: string) => {
                if (registeredElements.includes(item)) return false;
                registeredElements.push(item);
                return true;
            }).map((item: string) => {
                // Check if there's a global version of that Type,
                // it works for example for prefer `Rect` over `KAPLAYCtx.Rect`
                const isGlobal = allDoc[item] != null;
                let asCtxMember = ctxMembers.includes(item);

                if (isGlobal) {
                    asCtxMember = false;
                }

                return {
                    title: item,
                    url: asCtxMember
                        ? `/docs/api/ctx/${item}`
                        : `/docs/api/${item}`,
                    description: `${getDocEntryDescription(item)}`,
                };
            }),
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

export const filterGuides = (entry: {
    data: InferEntrySchema<"guides">;
}): boolean => {
    return filterByVersion(entry) && filterByHidden(entry);
};
// #endregion
