import { countByOrigin, originOptions, tags, tagsMessages } from "@/data/crew";
import { cn } from "@/util/cn";
import { useEffect, useRef, useState } from "preact/hooks";
import { CrewTags } from "./CrewTags";

interface CrewSearchProps {
    keywordFilter: string;
    setKeywordFilter: (val: string) => void;
    tagFilter: string[];
    setTagFilter: (val: string[]) => void;
    originFilter: originOptions;
    setOriginFilter: (val: originOptions) => void;
}

export const CrewSearch = ({
    keywordFilter,
    setKeywordFilter,
    tagFilter,
    setTagFilter,
    originFilter,
    setOriginFilter,
}: CrewSearchProps) => {
    let isLoaded = false;

    const tagsRef = useRef<HTMLDivElement>(null);
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const [tagsExpandable, setTagsExpandable] = useState(false);
    const [message, setMessage] = useState<string>("");
    const tooltipLeft = useRef(0);
    const tooltipX = useRef(0);

    const originOptionsCount: Record<originOptions, number> | {} = {};

    const toggleTags = () => {
        if (!tagsExpandable) return;
        setTagsExpanded(!tagsExpanded);
    };

    const updateMessage = (
        tag: string,
        e:
            | preact.JSX.TargetedMouseEvent<HTMLButtonElement>
            | preact.JSX.TargetedFocusEvent<HTMLButtonElement>,
    ) => {
        setMessage(tagsMessages[tag] || "");
        const { offsetLeft } = e.currentTarget;
        const parentWidth = tagsRef.current?.parentElement?.clientWidth ?? 0;
        const threshold = parentWidth * 0.5;
        tooltipLeft.current = offsetLeft;
        tooltipX.current = offsetLeft > threshold
            ? -35 - ((offsetLeft - threshold) / (parentWidth - threshold)) * 50
            : 0;
    };

    useEffect(() => {
        new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target as HTMLElement;
                target.style.height = "auto !important";

                if (target.scrollHeight > 25) {
                    setTagsExpandable(true);
                    if (!isLoaded) setTagsExpanded(false);
                } else {
                    setTagsExpandable(false);
                    if (!isLoaded) setTagsExpanded(true);
                }

                target.style.height = "";
            }

            isLoaded = true;
        }).observe(tagsRef.current as HTMLElement);
    }, []);

    return (
        <div class="crew-search flex flex-col gap-2">
            <div class="join w-full">
                <input
                    type="text"
                    class="join-item input input-bordered w-full focus:z-[1]"
                    placeholder="Search..."
                    value={keywordFilter}
                    onInput={e =>
                        setKeywordFilter((e.target as HTMLInputElement).value)}
                />

                <div class="tooltip grid" data-tip="Filter by Origin">
                    <select
                        class="peer col-start-1 row-start-1 select select-bordered font-sans text-xs sm:text-sm pr-11 sm:pr-10 opacity-0"
                        value={originFilter}
                        onChange={e => {
                            const val = (e.target as HTMLSelectElement).value;
                            setOriginFilter(val as originOptions);
                        }}
                    >
                        {originOptions.map(origin => (
                            <option value={origin} key={origin}>
                                {origin}{" "}
                                ({originOptionsCount[origin] = countByOrigin(
                                    origin as originOptions,
                                )})
                            </option>
                        ))}
                    </select>

                    <div className="join-item col-start-1 row-start-1 select select-bordered text-xs sm:text-sm pr-8 gap-1 items-center pointer-events-none peer-focus:outline peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-base-content/20">
                        {originFilter}

                        <span className="badge badge-xs font-medium ml-auto py-1 px-1 min-w-5 h-auto bg-base-content/15 border-0">
                            {originOptionsCount[originFilter]}
                        </span>
                    </div>
                </div>
            </div>

            <div
                class={cn(
                    "tooltip flex justify-between gap-1",
                    "before:flex before:items-center before:left-[var(--tooltip-left)] before:ml-1 before:translate-x-[var(--tooltip-x)] before:top-auto before:bottom-full before:mb-3 before:px-3 before:min-h-10 before:max-w-[calc(100vw-6rem)]",
                    "after:left-[var(--tooltip-left)] after:translate-x-4 after:top-auto after:bottom-full after:-translate-y-[0.35rem]",
                    "before:transition-opacity after:transition-opacity",
                    "[&:not(:has(.tag:hover,.tag:focus-visible))]:before:opacity-0 [&:not(:has(.tag:hover,.tag:focus-visible))]:after:opacity-0",
                )}
                style={{
                    "--tooltip-left": tooltipLeft.current + "px",
                    "--tooltip-x": tooltipX.current + "%",
                }}
                data-tip={message || undefined}
            >
                <div
                    ref={tagsRef}
                    class={cn("rounded-xl overflow-hidden", {
                        "max-h-6": !tagsExpanded,
                    })}
                >
                    <CrewTags
                        tags={tags}
                        filter={tagFilter}
                        setFilter={setTagFilter}
                        onTagHover={updateMessage}
                        onTagFocus={updateMessage}
                    />
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
