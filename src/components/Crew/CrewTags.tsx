import { useRef, useState } from "preact/hooks";
import { CrewTag } from "./CrewTag";

type CrewTagsProps = {
    tags: string[];
    filter: string[];
    setFilter: (val: string[]) => void;
    onTagHover: (
        tag: string,
        e: preact.JSX.TargetedMouseEvent<HTMLButtonElement>,
    ) => void;
    onTagFocus: (
        tag: string,
        e: preact.JSX.TargetedFocusEvent<HTMLButtonElement>,
    ) => void;
};

const rovingDir = {
    "ArrowDown": 1,
    "ArrowRight": 1,
    "ArrowUp": -1,
    "ArrowLeft": -1,
};
const rovingDirs = Object.keys(rovingDir);

export const CrewTags = (
    { tags, filter, setFilter, onTagHover, onTagFocus }: CrewTagsProps,
) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const [curTabIndex, setCurTabIndex] = useState(0);

    return (
        <div class="flex flex-wrap gap-1" role="group" ref={groupRef}>
            {tags.map((tag, i) => (
                <CrewTag
                    key={tag}
                    filter={filter}
                    value={tag}
                    setFilter={val => {
                        setFilter(val);
                        setCurTabIndex(i);
                    }}
                    onHover={(tag, e) => onTagHover(tag, e)}
                    onKeyDown={(e) => {
                        if (!rovingDirs.includes(e.key)) return;

                        e.preventDefault();
                        setCurTabIndex(
                            (curTabIndex + rovingDir[e.key] + tags.length)
                                % tags.length,
                        );
                        setTimeout(() =>
                            groupRef.current
                            && (groupRef.current.querySelector(
                                "[tabindex='0']",
                            ) as HTMLButtonElement)?.focus()
                        );
                    }}
                    onFocus={(tag, e) => onTagFocus(tag, e)}
                    tabindex={curTabIndex == i ? 0 : -1}
                >
                    {tag}
                </CrewTag>
            ))}
        </div>
    );
};
