import {
    $,
    component$,
    useOn,
    useOnDocument,
    useSignal,
    useTask$,
    useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { assets } from "@kaplayjs/crew";
import { CrewItem } from "./CrewItem.tsx";
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
    "objects": "Yokai, Yokai, Yokai...",
    "animals": "OMG",
    "food": "Yummy",
    "tiles": "Make Super Bean Maker a reality.",
    "icons": ".-O",
    "books": "Explore more books in:",
    "brand": "KAPLAY",
    "ui": "Oh",
    "emojis": "More in Discord!",
    "fonts": "",
};

export const CrewList = component$((props) => {
    const tagFilter = useSignal<string>();
    const nameFilter = useSignal<string>();
    const message = useSignal<string>();
    const curCrewItem = useSignal<keyof typeof assets>();

    const filterAssets = (asset: string | null) => {
        if (!tagFilter.value) {
            return true;
        }

        return assets[asset as keyof typeof assets].category
            === tagFilter.value;
    };

    const filterAssetsByName = (asset: string | null) => {
        if (!nameFilter.value) {
            return true;
        }

        return assets[asset as keyof typeof assets].name
            .toLowerCase()
            .includes(nameFilter.value.toLowerCase());
    };

    useTask$(({ track }) => {
        track(tagFilter);
        message.value = messages[tagFilter.value as Tag ?? "all"];
    });

    return (
        <div class="h-full min-h-dvh w-full overflow-y-auto lg:mt-10 md:flex md:justify-center">
            <div class="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-box bg-base-200 p-4 lg:max-h-[80%] lg:max-w-[50%] border border-base-content/15">
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

                <CrewSearch nameFilter={nameFilter} tagFilter={tagFilter} />

                <div
                    id="crew-list"
                    class="flex flex-col overflow-y-auto scrollbar-thin"
                    onScroll$={(e) => {
                        const scroll = (e.target as HTMLElement).scrollTop;
                        localStorage.setItem("scrolled", scroll.toString());
                    }}
                >
                    <div class="flex justify-center p-4">
                        <p>{message.value}</p>
                    </div>

                    <div class="flex flex-wrap items-center justify-center gap-2">
                        {Object.keys(assets)
                            .filter(filterAssets)
                            .filter(filterAssetsByName)
                            .map((crewItem, i) => (
                                <button
                                    key={i}
                                    onClick$={() => {
                                        curCrewItem.value =
                                            crewItem as keyof typeof assets;

                                        const dialog = document.querySelector<
                                            HTMLDialogElement
                                        >("#crew-modal");

                                        dialog?.showModal();
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

            <dialog id="crew-modal" class="modal">
                <div class="modal-box w-max p-0 m-0 max-w-max">
                    <CrewItem crewItem={curCrewItem.value ?? "bean"} isModal />
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
});
