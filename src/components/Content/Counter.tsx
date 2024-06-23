import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
    const counter = useSignal(0);

    return (
        <button
            class="btn btn-primary"
            onClick$={() => counter.value++}
        >
            {counter.value}
        </button>
    );
});
