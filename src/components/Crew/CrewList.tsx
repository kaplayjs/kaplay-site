import { assets, originOptions, tags } from "@/data/crew";
import { useMemo, useState } from "preact/hooks";
import { CrewSearch } from "./CrewSearch";
import { CrewTabs } from "./CrewTabs";

type CrewListProps = {
    openModal: (item: keyof typeof assets) => void;
};

type Tag = typeof tags[number];

export const CrewList = ({ openModal }: CrewListProps) => {
    const [minimized, setMinimized] = useState<boolean>(false);
    const [originFilter, setOriginFilter] = useState<originOptions>("All");
    const [tagFilter, setTagFilter] = useState<string[]>([]);
    const [keywordFilter, setKeywordFilter] = useState<string>("");

    const filterAssetsByOrigin = (asset: string | null) => {
        if (originFilter == "All") return true;
        return assets[asset as keyof typeof assets].origin == originFilter;
    };

    const filterAssetsByTag = (asset: string | null) => {
        if (tagFilter.length == 0) return true;
        return (tagFilter as Tag[]).some(
            tag => assets[asset as keyof typeof assets].tags.includes(tag),
        );
    };

    const filterAssetsByKeyword = (asset: string | null) => {
        if (!keywordFilter) return true;

        const crewItem = assets[asset as keyof typeof assets];
        const searchTerm = keywordFilter.toLowerCase();

        return crewItem.name
            .toLowerCase()
            .includes(searchTerm)
            || (crewItem?.searchTerms ?? []).some(term =>
                term.includes(searchTerm)
            );
    };

    const crewItems = useMemo(
        () =>
            Object.keys(assets)
                .filter(filterAssetsByOrigin)
                .filter(filterAssetsByTag)
                .filter(filterAssetsByKeyword),
        [originFilter, tagFilter, keywordFilter],
    ) as (keyof typeof assets)[];

    return (
        <div class="h-full w-full lg:py-2.5 2xl:py-10 md:flex md:justify-center">
            <div
                class="group relative flex h-full w-full flex-col rounded-box bg-base-300 lg:max-w-5xl border border-base-content/15 overflow-clip"
                data-minimized={minimized || undefined}
            >
                <button
                    class="btn absolute top-2 right-2 p-[0.5625rem] min-h-0 h-auto bg-base-50 border-0 hover:!border-bg-base-highlight rounded-xl z-10 hover:bg-base-highlight shadow-md shadow-base-300 transition-colors"
                    type="button"
                    onClick={() => {
                        setMinimized(!minimized);
                    }}
                    aria-label="Minimize filters"
                    aria-pressed={minimized}
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

                <div class="grid grid-rows-[1fr] p-4 lg:px-8 lg:pt-5 lg:pb-6 group-data-[minimized]:grid-rows-[0fr] group-data-[minimized]:py-0 overflow-hidden transition-all ease-out duration-200">
                    <div class="flex flex-col gap-4 min-h-0 rounded-t-[inherit] group-data-[minimized]:invisible">
                        <div class="flex justify-center flex-col">
                            <h1 class="font-hand text-3xl text-center">
                                <span class="text-primary">KAPLAY</span> Crew
                            </h1>
                            <p class="text-lg text-center">
                                <span class="font-hand text-slate-200 uppercase">
                                    Royalty-free
                                </span>{" "}
                                assets, for use in{"  "}
                                <span class="font-hand text-[#ea6262] uppercase">
                                    game jams
                                </span>{" "}
                                and prototypes
                            </p>
                        </div>

                        <CrewSearch
                            keywordFilter={keywordFilter}
                            setKeywordFilter={setKeywordFilter}
                            tagFilter={tagFilter}
                            setTagFilter={setTagFilter}
                            originFilter={originFilter}
                            setOriginFilter={setOriginFilter}
                        />
                    </div>
                </div>

                <CrewTabs
                    items={crewItems}
                    maximized={!minimized}
                    openModal={openModal}
                />
            </div>
        </div>
    );
};
