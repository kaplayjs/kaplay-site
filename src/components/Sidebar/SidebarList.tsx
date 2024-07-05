import { $lang } from "@/stores";

import {
    component$,
    useComputed$,
    useSignal,
    useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import type { SidebarEntry, SidebarProps } from "./Sidebar.astro";
import { SidebarFolder } from "./SidebarFolder";
import { SidebarLink } from "./SidebarLink";

type SidebarListProps = {
    sidebarEntries: SidebarEntry[];
} & SidebarProps;

export const SidebarList = component$(
    ({ sidebarMode, sidebarEntries }: SidebarListProps) => {
        let renderList = useSignal<SidebarEntry[]>(sidebarEntries ?? []);
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

        const searchInputRef = useSignal<HTMLInputElement>();
        const allOpen = sidebarMode === "guides";

        useVisibleTask$(() => {
            if (!searchInputRef.value) return;
            const defaultValue = new URLSearchParams(location.search).get(
                "search",
            ) ?? "";

            searchInputRef.value.defaultValue = defaultValue;
            filter.value = defaultValue;
        });

        return (
            <>
                <input
                    class="input input-primary w-full my-2"
                    placeholder="Search here"
                    bind:value={filter}
                    ref={searchInputRef}
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
                                    key={link}
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
