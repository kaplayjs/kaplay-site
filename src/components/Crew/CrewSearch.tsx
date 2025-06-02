import { tags } from "./CrewList";
import { CrewTag } from "./CrewTag";

interface CrewSearchProps {
    nameFilter: string;
    setNameFilter: (val: string) => void;
    tagFilter: string[];
    setTagFilter: (val: string[]) => void;
}

export const CrewSearch = ({
    nameFilter,
    setNameFilter,
    tagFilter,
    setTagFilter,
}: CrewSearchProps) => {
    return (
        <div class="crew-search | flex flex-col gap-2">
            <input
                type="text"
                class="input input-bordered hidden w-full lg:block"
                placeholder="Search..."
                value={nameFilter}
                onInput={e =>
                    setNameFilter((e.target as HTMLInputElement).value)}
            />

            <div class="join w-full">
                <div class="w-full">
                    <input
                        type="text"
                        class="input join-item input-bordered w-full lg:hidden"
                        placeholder="Search..."
                        value={nameFilter}
                        onInput={e =>
                            setNameFilter((e.target as HTMLInputElement).value)}
                    />
                </div>
            </div>

            <fieldset class="flex flex-wrap gap-2 justify-center">
                {tags.map(tag => (
                    <CrewTag
                        key={tag}
                        filter={tagFilter}
                        value={tag}
                        setFilter={setTagFilter}
                    >
                        {tag}
                    </CrewTag>
                ))}

                {tagFilter.length > 0 && (
                    <button
                        type="button"
                        class="badge badge-secondary badge-outline"
                        onClick={() => setTagFilter([])}
                    >
                        Clear Tags
                    </button>
                )}
            </fieldset>
        </div>
    );
};
