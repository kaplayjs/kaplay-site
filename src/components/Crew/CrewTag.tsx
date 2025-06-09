import { cn } from "@/util/cn";
import { useRef } from "preact/hooks";

type CrewTagProps = {
    value: string;
    filter: string[];
    setFilter: (val: string[]) => void;
    children?: preact.ComponentChildren;
    onHover: (
        tag: string,
        e: preact.JSX.TargetedMouseEvent<HTMLButtonElement>,
    ) => void;
    onKeyDown: (e: preact.JSX.TargetedKeyboardEvent<HTMLButtonElement>) => void;
    onFocus: (
        tag: string,
        e: preact.JSX.TargetedFocusEvent<HTMLButtonElement>,
    ) => void;
    tabindex: 0 | -1;
};

export const CrewTag = (
    {
        value,
        filter,
        setFilter,
        children,
        onHover,
        onKeyDown,
        onFocus,
        tabindex,
        ...props
    }: CrewTagProps,
) => {
    const inputRef = useRef<HTMLButtonElement>(null);

    const handleChange = () => {
        if (filter.includes(value)) {
            setFilter(filter.filter(tag => tag !== value));
        } else {
            setFilter([...filter, value]);
        }
    };

    return (
        <button
            ref={inputRef}
            class={cn(
                "relative tag btn btn-xs btn-outline font-medium capitalize bg-base-content/10 border-base-content/10 rounded-full focus-visible:-outline-offset-2 focus-visible:z-10",
                {
                    "bg-primary text-neutral focus-visible:ring-[3px] ring-inset ring-neutral":
                        filter.includes(value),
                },
            )}
            type="button"
            tabIndex={tabindex}
            onClick={handleChange}
            onMouseOver={e => onHover(value, e)}
            onKeyDown={onKeyDown}
            onFocus={e => onFocus(value, e)}
            aria-pressed={filter.includes(value)}
            {...props}
        >
            {children}
        </button>
    );
};
