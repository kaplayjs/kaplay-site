import { cn } from "@/util/cn";
import {
    component$,
    type Signal,
    Slot,
    useSignal,
    useTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

type CrewTagProps = {
    value: string | null;
    filter: Signal<string | null>;
};

export const CrewTag = component$<CrewTagProps>(({ filter, value }) => {
    const inputRef = useSignal<HTMLInputElement>();

    useTask$(({ track }) => {
        track(filter);

        if (isServer) return;

        if (value !== filter.value) {
            if (inputRef.value) {
                inputRef.value.checked = false;
            }
        }
    });

    return (
        <label
            class={cn("badge badge-primary select-none hoverable", {
                "badge-outline": filter.value !== value,
            })}
        >
            <Slot />
            <input
                type="checkbox"
                name="tags"
                class="hidden"
                checked={filter.value === value}
                onChange$={() => {
                    if (inputRef.value?.checked) {
                        filter.value = value!;
                    }
                    else if (filter.value === value) {
                        filter.value = null;
                    }
                }}
                ref={inputRef}
            />
        </label>
    );
});
