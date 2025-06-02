import { cn } from "@/util/cn";
import { useRef } from "preact/hooks";

type CrewTagProps = {
    value: string;
    filter: string[];
    setFilter: (val: string[]) => void;
    children?: preact.ComponentChildren;
};

export const CrewTag = (
    { value, filter, setFilter, children }: CrewTagProps,
) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        if (inputRef.current?.checked) {
            setFilter([...filter, value]);
        }
        else if (value && filter?.includes(value)) {
            setFilter(filter.filter(tag => tag !== value));
        }
    };

    return (
        <label
            class={cn("hoverable badge badge-primary select-none", {
                "badge-outline": !filter?.includes(value),
            })}
        >
            {children}
            <input
                type="checkbox"
                name="tags"
                class="hidden"
                checked={filter?.includes(value)}
                onChange={handleChange}
                ref={inputRef}
            />
        </label>
    );
};
