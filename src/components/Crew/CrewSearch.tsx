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
                    class="| | input input-bordered hidden w-full lg:block"
                    placeholder="Search..."
                    bind:value={nameFilter}
                />

                <div class="| join w-full">
                    <div class="w-full">
                        <input
                            type="text"
                            class="| input join-item input-bordered w-full lg:hidden"
                            placeholder="Search..."
                            bind:value={nameFilter}
                        />
                    </div>
                    <select
                        class="| join-item select select-bordered lg:hidden"
                        bind:value={tagFilter}
                    >
                        <option selected value="">
                            no filter
                        </option>
                        {tags.map((tag) => (
                            <option value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>

                <fieldset class="| hidden flex-wrap gap-2 lg:flex">
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
