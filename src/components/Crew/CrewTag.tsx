import { cn } from "@/util/cn";
import { useRef } from "preact/hooks";

type CrewTagProps = {
    value: string | null;
    filter: string | undefined;
    setFilter: (val: string | undefined) => void;
    children?: preact.ComponentChildren;
};

export const CrewTag = (
    { value, filter, setFilter, children }: CrewTagProps,
) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        if (inputRef.current?.checked) {
            setFilter(value!);
        }
        else if (filter == value) {
            setFilter(undefined);
        }
    };

    return (
        <label
            class={cn("hoverable badge badge-primary select-none", {
                "badge-outline": filter != value,
            })}
        >
            {children}
            <input
                type="checkbox"
                name="tags"
                class="hidden"
                checked={filter == value}
                onChange={handleChange}
                ref={inputRef}
            />
        </label>
    );
};
