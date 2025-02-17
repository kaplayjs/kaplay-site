import {
    component$,
    useSignal,
    useTask$,
    useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { assets } from "@kaplayjs/crew";
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
] as const;

export const CrewList = component$((props) => {
    const tagFilter = useSignal<string>();
    const nameFilter = useSignal<string>();

    const filterAssets = (asset: string | null) => {
        if (!tagFilter.value) {
            return true;
        }

        return assets[asset as keyof typeof assets].type === tagFilter.value;
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

        if (!isServer) {
            const url = new URL(window.location.href);
            url.searchParams.set("filter", tagFilter.value || "");
            window.history.replaceState({}, "", url.toString());
        }
    });

    useVisibleTask$(() => {
        const url = new URL(window.location.href);
        const filter = url.searchParams.get("filter") ?? "";
        tagFilter.value = filter;
    });

    return (
        <div class="h-full min-h-dvh w-full overflow-y-auto lg:mt-20 md:flex md:justify-center">
            <div class="flex h-full w-full flex-col gap-4 overflow-y-auto rounded-box bg-base-200 p-4 lg:max-h-[80%] lg:max-w-[50%] border border-base-content/15">
                <CrewSearch nameFilter={nameFilter} tagFilter={tagFilter} />

                <div class="flex flex-wrap items-center justify-center gap-2 overflow-y-auto scrollbar-thin">
                    {Object.keys(assets)
                        .filter(filterAssets)
                        .filter(filterAssetsByName)
                        .map((crewItem, i) => (
                            <a href={`/crew/${crewItem}`} key={i}>
                                <CrewListItem
                                    crewItem={crewItem as keyof typeof assets}
                                />
                            </a>
                        ))}
                </div>
            </div>
        </div>
    );
});
