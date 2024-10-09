import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { SidebarEntry, SidebarProps } from "./Sidebar.astro";
import { SidebarFolder } from "./SidebarFolder";
import { SidebarLink } from "./SidebarLink";

type Props = {
    sidebarEntries: SidebarEntry[];
} & SidebarProps;

export const SidebarList = component$((props: Props) => {
    let sidebarEntries = useSignal<SidebarEntry[]>(props.sidebarEntries ?? []);
    let filter = useSignal("");

    const searchInputRef = useSignal<HTMLInputElement>();

    useTask$(({ track }) => {
        track(filter);

        if (filter.value === "") {
            sidebarEntries.value = props.sidebarEntries;
            return;
        }

        const newSidebarEntries = props.sidebarEntries.map((entry) => {
            const linkList = entry.linkList.filter((l) =>
                (`${l.title ?? ""} ${l.description ?? ""}`).toLowerCase()
                    .includes(filter.value.toLowerCase())
            );

            return {
                ...entry,
                linkList,
            };
        });

        sidebarEntries.value = newSidebarEntries;

        console.log(
            newSidebarEntries.map((e) => e.linkList.map((l) => l.title)).flat(),
        );
    });

    return (
        <>
            <input
                class="input input-primary w-full my-2"
                placeholder={props.sidebarMode === "reference"
                    ? "Search for API..."
                    : "Search for Guides..."}
                bind:value={filter}
                ref={searchInputRef}
            />

            {sidebarEntries.value.filter(({ linkList }) => linkList.length > 0)
                .map(({ linkList, folder }, i) => {
                    return (
                        <SidebarFolder
                            title={folder}
                            id={folder}
                            isOpen={linkList.length > 0}
                            key={folder + i}
                        >
                            {linkList.map(({ title, link }, i) => (
                                <SidebarLink
                                    href={link}
                                    key={link + i}
                                >
                                    {title}
                                </SidebarLink>
                            ))}
                        </SidebarFolder>
                    );
                })}
        </>
    );
});
