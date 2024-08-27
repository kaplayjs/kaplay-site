import doc from "@/../doc.json";
import { $lang } from "@/stores";
import type { LocaleSubKeys } from "@/util/i18n";
import { t } from "@/util/i18n";
import { assets } from "@kaplayjs/crew";
import { getCollection } from "astro:content";
import type { SidebarEntry } from "./Sidebar.astro";

const allDoc = doc.types as any;

const booksInfo: Record<string, {
    title: string;
    potrait: string;
}> = {
    "how_to_be_a_bean_wizard": {
        title: "How to be a Bean Wizard",
        potrait: assets.how_to_be_a_bean_wizard.outlined!,
    },
};

export const getGuidesEntries = async () => {
    let renderList: SidebarEntry[] = [];

    const lang = $lang.get();
    const guides = await getCollection("guides");
    const sortedGuides = guides.sort((a, b) => (a.data.order - b.data.order));

    const guidesByCategory = sortedGuides.reduce((acc, guide) => {
        const [guideLang, folder] = guide.slug.split("/");
        const folderName = t(
            lang,
            `guides.${folder as LocaleSubKeys["guides"]}`,
        );

        if (lang !== guideLang) return acc;

        if (!acc[folderName]) {
            acc[folderName] = [];
        }

        acc[folderName].push(guide);

        return acc;
    }, {} as Record<string, any>);

    renderList = [
        ...Object.keys(guidesByCategory).map((category) => ({
            folder: category,
            linkList: guidesByCategory[category].map((guide: any) => ({
                title: guide.data.title,
                link: `/guides/${guide.slug.split("/")[2]}`,
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
            })),
        })),
    ];

    return renderList;
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
                };
            }),
        });
    });

    return renderList;
};
