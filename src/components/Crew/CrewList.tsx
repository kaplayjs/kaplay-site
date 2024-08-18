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

        return assets[asset as keyof typeof assets].name.toLowerCase().includes(
            nameFilter.value.toLowerCase(),
        );
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
        <div class="h-full w-full overflow-y-auto lg:flex lg:items-center lg:justify-center">
            <div class="flex flex-col gap-4 | p-4 h-full w-full lg:max-w-[50%] lg:max-h-[60%] | overflow-y-auto bg-base-100 rounded-box">
                <CrewSearch nameFilter={nameFilter} tagFilter={tagFilter} />

                <div class="flex items-center justify-center flex-wrap gap-2 overflow-y-auto">
                    {Object.keys(assets).filter(filterAssets).filter(
                        filterAssetsByName,
                    ).map((crewItem, i) => (
                        <a
                            href={`/crew/${crewItem}`}
                            key={i}
                        >
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
