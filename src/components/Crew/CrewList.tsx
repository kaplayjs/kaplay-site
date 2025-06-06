import { assets } from "@/data/crew";
import { useEffect, useRef, useState } from "preact/hooks";
import { CrewItem } from "./CrewItem";
import { CrewListItem } from "./CrewListItem";
import { CrewSearch } from "./CrewSearch";

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

type Tag = typeof tags[number] | "all";

const messages: Record<Tag, string> = {
    "all": "Welcome to KAWorld, the KAPLAYER's home :D",
    "crew": "The protagonists of your next adventure",
    "objects": "",
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
    const [tagFilter, setTagFilter] = useState<string | undefined>(undefined);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [message, setMessage] = useState<string>(messages.all);
    const [curCrewItem, setCurCrewItem] = useState<keyof typeof assets | null>(
        null,
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    const filterAssets = (asset: string | null) => {
        if (!tagFilter) return true;
        return assets[asset as keyof typeof assets].category === tagFilter;
    };

    const filterAssetsByName = (asset: string | null) => {
        if (!nameFilter) return true;
        return assets[asset as keyof typeof assets].name
            .toLowerCase()
            .includes(nameFilter.toLowerCase());
    };

    useEffect(() => {
        setMessage(messages[(tagFilter as Tag) ?? "all"]);
    }, [tagFilter]);

    /* useEffect(() => {
        const scrolled = localStorage.getItem("scrolled");
        if (!scrolled) return;

        const list = document.getElementById("crew-list");
        if (list) list.scrollTop = parseInt(scrolled, 10);
    }, []); */

    return (
        <div class="h-full min-h-dvh w-full overflow-y-auto lg:mt-10 md:flex md:justify-center">
            <div class="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-box bg-base-200 p-4 lg:max-h-[80%] lg:max-w-[50%] border border-base-content/15">
                <div class="flex justify-center flex-col">
                    <h1 class="font-hand text-3xl text-center">
                        <span class="text-primary">KAPLAY</span> Crew
                    </h1>
                    <p class="text-lg text-center">
                        <span class="font-hand uppercase">Royalty free</span>
                        {" "}
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
                />

                <div
                    id="crew-list"
                    class="flex flex-col overflow-y-auto scrollbar-thin"
                    /* onScroll={(e) => {
                        const scroll =
                            (e.currentTarget as HTMLElement).scrollTop;
                        localStorage.setItem("scrolled", scroll.toString());
                    }} */
                >
                    <div class="flex justify-center p-4">
                        <p>{message}</p>
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-2">
                        {Object.keys(assets)
                            .filter(filterAssets)
                            .filter(filterAssetsByName)
                            .map((crewItem, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                        setCurCrewItem(
                                            crewItem as keyof typeof assets,
                                        );
                                        dialogRef.current?.showModal();
                                    }}
                                >
                                    <CrewListItem
                                        crewItem={crewItem as keyof typeof assets}
                                    />
                                </button>
                            ))}
                    </div>
                </div>
            </div>

            <dialog ref={dialogRef} class="modal" id="crew-modal">
                <div class="modal-box w-max p-0 m-0 max-w-max">
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
