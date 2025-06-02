import { cn } from "@/util/cn";
import { useEffect, useRef, useState } from "preact/hooks";
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
    let isLoaded = false;

    const tagsRef = useRef<HTMLDivElement>(null);
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const [tagsExpandable, setTagsExpandable] = useState(false);

    const toggleTags = () => {
        if (!tagsExpandable) return;
        setTagsExpanded(!tagsExpanded);
    };

    useEffect(() => {
        new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target as HTMLElement;
                target.style.height = "auto !important";

                if (target.scrollHeight > 25) {
                    setTagsExpandable(true);
                    if (!isLoaded) setTagsExpanded(false);
                }
                else {
                    setTagsExpandable(false);
                    if (!isLoaded) setTagsExpanded(true);
                }

                target.style.height = "";
            }

            isLoaded = true;
        }).observe(tagsRef.current as HTMLElement);
    }, []);

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

            <div class="flex justify-between gap-1">
                <div
                    ref={tagsRef}
                    class={cn("rounded-xl overflow-hidden", {
                        "max-h-6": !tagsExpanded,
                    })}
                >
                    <fieldset class="flex flex-wrap gap-1">
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

                <div className="flex gap-1 shrink-0">
                    <button
                        class={cn(
                            "btn btn-xs btn-outline gap-1 font-medium px-0 w-6 bg-base-content/10 border-base-content/10 rounded-full opacity-0 scale-0 focus-visible:z-10 transition-all",
                            { "opacity-1 scale-100": tagFilter.length },
                        )}
                        type="button"
                        disabled={tagFilter.length == 0}
                        onClick={() => setTagFilter([])}
                        aria-label="Clear tags"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>

                    <button
                        className={cn(
                            "btn btn-xs btn-outline gap-1 font-medium pl-1 pr-1.5 bg-base-content/10 border-base-content/10 rounded-full focus-visible:z-10",
                            {
                                "bg-base-content text-neutral": tagsExpanded
                                    && tagsExpandable,
                            },
                        )}
                        type="button"
                        onClick={toggleTags}
                        aria-expanded={tagsExpanded || !tagsExpandable}
                        tabIndex={!tagsExpandable ? -1 : undefined}
                    >
                        <span className="badge badge-xs font-medium text-[0.5rem] py-0.5 px-0.5 min-w-4 h-auto bg-base-100 border-0">
                            {tags.length}
                        </span>

                        Tags

                        <svg
                            className={cn(
                                "transition-transform max-md:!block",
                                {
                                    "-rotate-90": tagsExpanded,
                                    "hidden": !tagsExpandable,
                                },
                            )}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-label="Toggle"
                            role="img"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
