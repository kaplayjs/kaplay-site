import { assets, originOptions, typeOptions } from "@/data/crew";
import { useEffect, useRef, useState } from "preact/hooks";
import { CrewItem } from "./CrewItem";
import { CrewListItem } from "./CrewListItem";
import { CrewSearch } from "./CrewSearch";
import { CrewTabs } from "./CrewTabs";

export const tags = [
    "crew",
    "objects",
    "animals",
    "food",
    "tiles",
    "icons",
    "books",
    "brand",
    "ui",
    "emojis",
    "fonts",
] as const;

type Tag = typeof tags[number];

const messages: Record<Tag | "all", string> = {
    "all": "Welcome to KAWorld, the KAPLAYER's home :D",
    "crew": "The protagonists of your next adventure",
    "objects": "Objects of power",
    "animals": "Yokai, Yokai, Yokai...",
    "food": "YUMMY",
    "tiles": "Make Super Bean Maker a reality.",
    "icons": "Used on this web :D",
    "books": "Explore more books in: https://kaplayjs.com/books",
    "brand": "KAPLAY brand related logos, assets",
    "ui": "*Click*",
    "emojis": "More in Discord!",
    "fonts": "Sad font coming soon...",
};

export const CrewList = () => {
    const [originFilter, setOriginFilter] = useState<originOptions>("All");
    const [tagFilter, setTagFilter] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<typeOptions>("All");
    const [message, setMessage] = useState<string>(messages.all);
    const [curCrewItem, setCurCrewItem] = useState<keyof typeof assets | null>(
        null,
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    const tabsRef = useRef<HTMLDivElement>(null);
    const tabsScrollTop = useRef<Record<typeOptions, number> | {}>({});

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

    const crewItems = Object.keys(assets)
        .filter(filterAssetsByOrigin)
        .filter(filterAssetsByType)
        .filter(filterAssetsByTag)
        .filter(filterAssetsByName);

    useEffect(() => {
        if (!tabsRef.current) return;

        const scrollTop = tabsScrollTop.current[typeFilter] ?? 0;
        tabsRef.current.scrollTop = scrollTop;
    }, [typeFilter]);

    useEffect(() => {
        setMessage(
            messages[tagFilter.length == 1 ? (tagFilter[0] as Tag) : "all"],
        );
    }, [tagFilter]);

    return (
        <div class="h-full w-full lg:py-2.5 2xl:py-10 md:flex md:justify-center">
            <div class="flex h-full w-full flex-col rounded-box bg-base-300 lg:max-w-5xl border border-base-content/15 overflow-clip">
                <div class="flex flex-col gap-4 p-4 lg:px-8 lg:pt-5 lg:pb-6 rounded-t-[inherit]">
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
                    active={typeFilter}
                    activeCount={crewItems.length}
                    onChange={type => {
                        tabsScrollTop.current[typeFilter] =
                            tabsRef.current?.scrollTop ?? 0;
                        setTypeFilter(type);
                    }}
                />

                <div
                    id="crew-list"
                    class="flex flex-col flex-1 px-4 lg:px-8 py-4 lg:py-4 bg-base-100/60 border-t-4 border-transparent overflow-y-auto !scroll-auto scrollbar-thin focus:outline-none focus-visible:ring-2 focus-visible:ring-base-content/10 rounded-b-xl"
                    ref={tabsRef}
                >
                    <div class="flex justify-center -mt-1 p-4 pt-0">
                        <p>{message}</p>
                    </div>

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
                        class="absolute top-2 right-2 p-2 bg-base-50 rounded-xl z-10 hover:bg-base-content/30 transition-colors focus:outline-none focus:ring-2 focus:ring-current"
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
