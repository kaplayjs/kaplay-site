import { assets, originOptions, tags, typeOptions } from "@/data/crew";
import { useEffect, useRef, useState } from "preact/hooks";
import { CrewItem } from "./CrewItem";
import { CrewListItem } from "./CrewListItem";
import { CrewSearch } from "./CrewSearch";
import { CrewTabs } from "./CrewTabs";

type Tag = typeof tags[number];

export const CrewList = () => {
    const [minimized, setMinimized] = useState<boolean>(false);
    const [originFilter, setOriginFilter] = useState<originOptions>("All");
    const [tagFilter, setTagFilter] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<typeOptions>("All");
    const [curCrewItem, setCurCrewItem] = useState<keyof typeof assets | null>(
        null,
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    const filterAssetsByOrigin = (asset: string | null) => {
        if (originFilter == "All") return true;
        return assets[asset as keyof typeof assets].origin == originFilter;
    };

    const filterAssetsByType = (asset: string | null) => {
        if (typeFilter == "All") return true;
        return assets[asset as keyof typeof assets].type == typeFilter;
    };

    const filterAssetsByTag = (asset: string | null) => {
        if (tagFilter.length == 0) return true;
        return (tagFilter as Tag[]).some(
            tag => assets[asset as keyof typeof assets].tags.includes(tag),
        );
    };

    const filterAssetsByName = (asset: string | null) => {
        if (!nameFilter) return true;
        return assets[asset as keyof typeof assets].name
            .toLowerCase()
            .includes(nameFilter.toLowerCase());
    };

    const allTabFiltered = Object.keys(assets)
        .filter(filterAssetsByOrigin)
        .filter(filterAssetsByTag)
        .filter(filterAssetsByName);

    const crewItems = allTabFiltered
        .filter(filterAssetsByType);

    const tabsRef = useRef<HTMLDivElement>(null);
    const tabsScrollTop = useRef<Record<typeOptions, number> | {}>({});
    const tabTriggers = Object.fromEntries(typeOptions.map(type => [
        type,
        type == "All"
            ? allTabFiltered.length
            : allTabFiltered.filter(asset =>
                assets[asset as keyof typeof assets].type == type
            ).length,
    ])) as Record<typeOptions, number>;

    useEffect(() => {
        if (!tabsRef.current) return;

        const scrollTop = tabsScrollTop.current[typeFilter] ?? 0;
        tabsRef.current.scrollTop = scrollTop;
    }, [typeFilter]);

    return (
        <div class="h-full w-full lg:py-2.5 2xl:py-10 md:flex md:justify-center">
            <div
                class="group relative flex h-full w-full flex-col rounded-box bg-base-300 lg:max-w-5xl border border-base-content/15 overflow-clip"
                data-minimized={minimized || undefined}
            >
                <button
                    class="btn absolute top-2 right-2 p-[0.5625rem] min-h-0 h-auto bg-base-50 border-0 hover:!border-bg-base-content/30 rounded-xl z-10 hover:bg-base-content/30 transition-colors"
                    type="button"
                    onClick={() => {
                        setMinimized(!minimized);
                    }}
                    aria-label="Toggle filters"
                >
                    <svg
                        class="group-data-[minimized]:rotate-180"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M3 9h18" />
                        <path d="m9 16 3-3 3 3" />
                    </svg>
                </button>

                <div class="flex flex-col gap-4 p-4 lg:px-8 lg:pt-5 lg:pb-6 rounded-t-[inherit] group-data-[minimized]:hidden">
                    <div class="flex justify-center flex-col">
                        <h1 class="font-hand text-3xl text-center">
                            <span class="text-primary">KAPLAY</span> Crew
                        </h1>
                        <p class="text-lg text-center">
                            <span class="font-hand uppercase">
                                Royalty free
                            </span>{" "}
                            assets, for using in{"  "}
                            <span class="font-hand text-[#ea6262] uppercase">
                                game jams
                            </span>{" "}
                            and prototypes
                        </p>
                    </div>

                    <CrewSearch
                        nameFilter={nameFilter}
                        setNameFilter={setNameFilter}
                        tagFilter={tagFilter}
                        setTagFilter={setTagFilter}
                        originFilter={originFilter}
                        setOriginFilter={setOriginFilter}
                    />
                </div>

                <CrewTabs
                    tabs={tabTriggers}
                    active={typeFilter}
                    onChange={type => {
                        tabsScrollTop.current[typeFilter] =
                            tabsRef.current?.scrollTop ?? 0;
                        setTypeFilter(type);
                    }}
                    data-maximized={!minimized || undefined}
                />

                <div
                    id="crew-list"
                    class="flex flex-col flex-1 px-4 lg:px-8 py-4 lg:py-4 bg-base-100/60 border-t-4 border-transparent overflow-y-auto !scroll-auto scrollbar-thin focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-content/10 rounded-b-xl group-data-[minimized]:rounded-tr-lg"
                    ref={tabsRef}
                >
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        {crewItems.map((crewItem, i) => (
                            <a
                                class="max-[459px]:grow max-[459px]:basis-1/3 focus:outline-none focus-visible:ring-2 focus-visible:ring-base-content rounded-xl"
                                key={i}
                                href={`/crew/${crewItem}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurCrewItem(
                                        crewItem as keyof typeof assets,
                                    );
                                    dialogRef.current?.showModal();
                                }}
                            >
                                <CrewListItem
                                    crewItem={crewItem as keyof typeof assets}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <dialog
                ref={dialogRef}
                class="modal p-2 backdrop:opacity-0 bg-[#0a0c10]/60"
                id="crew-modal"
            >
                <div
                    class="modal-box flex p-0 m-0 w-full max-w-[calc(64rem-4rem)] max-h-full focus:outline-none"
                    tabIndex={0}
                >
                    <button
                        class="btn absolute top-2 right-2 p-2 min-h-0 h-auto bg-base-50 border-0 rounded-xl z-10 hover:bg-base-content/30 transition-colors"
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <CrewItem crewItem={curCrewItem ?? undefined} isModal />
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                    >
                        close
                    </button>
                </form>
            </dialog>
        </div>
    );
};
