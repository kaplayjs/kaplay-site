import doc from "@/../doc.json";
import kaplayPackageJson from "@/../kaplay/package.json";
import { booksInfo } from "@/data/booksData";
import { $lang } from "@/stores";
import type { LocaleSubKeys } from "@/util/i18n";
import { t } from "@/util/i18n";
import { getCollection } from "astro:content";
import type { SidebarEntry } from "./Sidebar.astro";

const version = kaplayPackageJson.version.startsWith("4") ? "v4000" : "v3001";
const allDoc = doc.types as any;

const guidesData: Record<string, {
    title: string;
}> = {
    "0_making_your_first_game": {
        title: "Making Your First Game",
    },
    "1_getting_started": {
        title: "Getting Started",
    },
    "2_advanced": {
        title: "Advanced",
    },
    "3_expanding_kaplay": {
        title: "Expanding KAPLAY",
    },
    "44_misc": {
        title: "Misc",
    },
};

export const getGuidesEntries = async () => {
    const lang = $lang.get();
    const guides = (await getCollection("guides")).filter((guide) => {
        return (guide.data.version === undefined
            || guide.data.version === version) && guide.id.startsWith(lang);
    }).sort((a, b) => a.id.localeCompare(b.id));

    const guidesByCategory = guides.reduce((acc, guide) => {
        const [_, folder] = guide.id.split("/");

        if (!acc[folder]) {
            acc[folder] = [];
        }

        acc[folder].push(guide);
        return acc;
    }, {} as Record<string, typeof guides>);

    const renderList = [
        ...Object.keys(guidesByCategory).map((category) => ({
            folder: guidesData[category]?.title ?? category,
            linkList: guidesByCategory[category].map((guide) => ({
                title: guide.data.title,
                link: `/guides/${guide.data.url ?? guide.id.split("/")[2]}`,
                description: guide.data.description,
            })),
        })),
    ];

    return renderList;
};

export const getBlogEntries = async () => {
    let renderList: SidebarEntry[] = [];

    const lang = $lang.get();
    const guides = await getCollection("blog");
    const sortedEntries = guides.sort((
        a,
        b,
    ) => (new Date(a.data.date).getDate() - new Date(b.data.date).getDate()));

    renderList = [
        {
            folder: "Blog",
            linkList: sortedEntries.map((entry: any) => ({
                title: entry.data.title,
                link: `/blog/${entry.slug}`,
                description: "",
            })),
        },
    ];

    return renderList;
};

export const getBookEntries = async () => {
    let renderList: SidebarEntry[] = [];

    const lang = $lang.get();
    const books = await getCollection("books");
    const sortedBooks = books.sort((a, b) => (a.data.chapter - b.data.chapter));

    const booksByCategory = sortedBooks.reduce((acc, book) => {
        const [bookLang, folder] = book.slug.split("/");
        const folderName = folder;

        if (lang !== bookLang) return acc;

        if (!acc[folderName]) {
            acc[folderName] = [];
        }

        acc[folderName].push(book);

        return acc;
    }, {} as Record<string, any>);

    renderList = [
        ...Object.keys(booksByCategory).map((category) => ({
            folder: booksInfo[category].title ?? category,
            linkList: booksByCategory[category].map((book: any) => ({
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
        ?? allDoc.KAPLAYCtx?.[0].members[item] ?? allDoc[item];
    const docObj = docObjs[0];
    const docDesc = getDocDescription(docObj?.jsDoc?.doc);

    return docDesc;
};

const getDocDescription = (item: unknown) => {
    if (typeof item === "string") {
        return item;
    }
    else if (Array.isArray(item)) {
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
        renderList.push({
            folder: groupName,
            linkList: groups[groupName].entries.map((item: any) => {
                const isCtxMember = ctxMembers.includes(item);

                return {
                    title: item,
                    link: isCtxMember
                        ? `/doc/ctx/${item}`
                        : `/doc/${item}`,
                    description: `${getDocEntryDescription(item)}`,
                };
            }),
        });
    });

    return renderList;
};
