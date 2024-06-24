import doc from "@/../doc.json";
import { $lang } from "@/stores";
import type { Locale, LocaleSubKeys, TranslationString } from "@/util/i18n";
import { t } from "@/util/i18n";
import {
    component$,
    useComputed$,
    useSignal,
    useTask$,
} from "@builder.io/qwik";
import { getCollection } from "astro:content";
import type { SidebarEntry, SidebarProps } from "./Sidebar.astro";
import { SidebarFolder } from "./SidebarFolder";
import { SidebarLink } from "./SidebarLink";

const getGuidesEntries = async () => {
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

const getBlogEntries = async () => {
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

const getDocEntries = async () => {
    const renderList: SidebarEntry[] = [];
    const kaboomCtxMembers = Object.keys(doc.types.KaboomCtx[0].members);
    const groups = doc.groups;
    const groupsKeys = Object.keys(doc.groups) as (keyof typeof doc.groups)[];

    groupsKeys.map((groupName) => {
        renderList.push({
            folder: groupName,
            linkList: groups[groupName].entries.map((item: any) => {
                const isKaboomCtxMember = kaboomCtxMembers.includes(item);

                return {
                    title: item,
                    link: isKaboomCtxMember
                        ? `/doc/ctx/${item}`
                        : `/doc/${item}`,
                };
            }),
        });
    });

    return renderList;
};

export const SidebarList = component$(
    ({ sidebarMode }: SidebarProps) => {
        let renderList = useSignal<SidebarEntry[]>([]);
        let filter = useSignal("");
        let filteredList = useComputed$(() => {
            return renderList.value.filter(({ linkList }) =>
                linkList.some(
                    ({ title }) =>
                        (title ?? "").toLowerCase().includes(
                            filter.value.toLowerCase(),
                        ),
                )
            );
        });

        const allOpen = sidebarMode === "guides";

        useTask$(async () => {
            if (sidebarMode === "guides") {
                renderList.value = await getGuidesEntries();
            } else if (sidebarMode === "reference") {
                renderList.value = await getDocEntries();
            } else if (sidebarMode === "blog") {
                renderList.value = await getBlogEntries();
            }
        });

        return (
            <>
                <input
                    class="input input-primary"
                    placeholder="Search here"
                    bind:value={filter}
                />

                {filteredList.value.map(({ linkList, folder }) => {
                    const filteredList = linkList.filter((
                        { title },
                    ) => (title ?? "").toLowerCase().includes(
                        filter.value.toLowerCase(),
                    ));

                    return (
                        <SidebarFolder
                            title={folder}
                            id={folder}
                            isOpen={filteredList.length > 0 || allOpen}
                        >
                            {filteredList.map(({ title, link }) => (
                                <SidebarLink
                                    link={link}
                                    lang={$lang.get()}
                                    noTranslate={sidebarMode === "reference"}
                                >
                                    {title}
                                </SidebarLink>
                            ))}
                        </SidebarFolder>
                    );
                })}
            </>
        );
    },
);
