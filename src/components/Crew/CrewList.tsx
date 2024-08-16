import {
    $,
    component$,
    type Signal,
    useOnDocument,
    useOnWindow,
    useSignal,
    useTask$,
    useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { assets } from "@kaplayjs/crew";
import { CrewListItem } from "./CrewListItem";
import { CrewTag } from "./CrewTag";

export interface CrewListProps {
}

export const CrewList = component$<CrewListProps>((props) => {
    const tagFilter = useSignal<string | null>(null);
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
        const filter = url.searchParams.get("filter");
        tagFilter.value = filter;
    });

    return (
        <div class="flex flex-col gap-4 | max-w-screen-md max-h-[764px] p-4 | overflow-y-auto bg-base-100 rounded-box h-screen w-screen">
            <div class="crew-search | flex flex-col gap-2">
                <input
                    type="text"
                    class="input input-bordered | w-full"
                    placeholder="Search..."
                    bind:value={nameFilter}
                />

                <fieldset class="flex gap-2">
                    <CrewTag filter={tagFilter} value="crew">
                        crew
                    </CrewTag>
                    <CrewTag filter={tagFilter} value="objects">
                        objects
                    </CrewTag>
                    <CrewTag filter={tagFilter} value="animals">
                        animals
                    </CrewTag>
                    <CrewTag filter={tagFilter} value="food">
                        food
                    </CrewTag>
                    <CrewTag filter={tagFilter} value="tiles">
                        tiles
                    </CrewTag>
                    <CrewTag filter={tagFilter} value="icons">
                        icons
                    </CrewTag>
                </fieldset>
            </div>

            <div class="flex items-center justify-center flex-wrap | max-w-screen-md gap-2 overflow-y-auto">
                {Object.keys(assets).filter(filterAssets).filter(
                    filterAssetsByName,
                ).map((crewItem, i) => (
                    <a
                        href={`/crew/${crewItem}?filter=${tagFilter.value}`}
                        key={i}
                    >
                        <CrewListItem
                            crewItem={crewItem as keyof typeof assets}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
});
