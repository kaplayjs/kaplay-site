import { tags } from "./CrewList";
import { CrewTag } from "./CrewTag";

interface CrewSearchProps {
    nameFilter: string;
    setNameFilter: (val: string) => void;
    tagFilter: string | undefined;
    setTagFilter: (val: string | undefined) => void;
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
                <select
                    class="join-item select select-bordered lg:hidden"
                    value={tagFilter ?? ""}
                    onChange={e => {
                        const val = (e.target as HTMLSelectElement).value;
                        setTagFilter(val === "" ? undefined : val);
                    }}
                >
                    <option value="">no filter</option>
                    {tags.map(tag => (
                        <option value={tag} key={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            <fieldset class="hidden flex-wrap gap-2 lg:flex justify-center">
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
            </fieldset>
        </div>
    );
};
