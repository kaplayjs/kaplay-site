import { component$, type Signal, useSignal } from "@builder.io/qwik";
import { tags } from "./CrewList";
import { CrewTag } from "./CrewTag";

export interface CrewSearchProps {
    tagFilter: Signal<string | undefined>;
    nameFilter: Signal<string | undefined>;
}

export const CrewSearch = component$<CrewSearchProps>(
    ({ nameFilter, tagFilter }) => {
        return (
            <div class="crew-search | flex flex-col gap-2">
                <input
                    type="text"
                    class="input input-bordered | w-full | hidden lg:block"
                    placeholder="Search..."
                    bind:value={nameFilter}
                />

                <div class="join | w-full">
                    <div class="w-full">
                        <input
                            type="text"
                            class="input input-bordered join-item | lg:hidden w-full"
                            placeholder="Search..."
                            bind:value={nameFilter}
                        />
                    </div>
                    <select
                        class="select select-bordered join-item | lg:hidden"
                        bind:value={tagFilter}
                    >
                        <option selected value="">no filter</option>
                        {tags.map((tag) => <option value={tag}>{tag}</option>)}
                    </select>
                </div>

                <fieldset class="flex-wrap gap-2 | hidden lg:flex">
                    {tags.map((tag) => (
                        <CrewTag filter={tagFilter} value={tag}>
                            {tag}
                        </CrewTag>
                    ))}
                </fieldset>
            </div>
        );
    },
);
