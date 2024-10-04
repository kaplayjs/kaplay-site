import { cn } from "@/util/cn";
import { component$, Slot } from "@builder.io/qwik";

type Props = {
    hideOnMobile?: boolean;
};

export const BlockStack = component$<Props>(({ hideOnMobile }) => {
    return (
        <div
            class={cn("hidden flex-col lg:flex-row gap-2 w-full", {
                "lg:flex": hideOnMobile,
                "flex": !hideOnMobile,
            })}
        >
            <Slot />
        </div>
    );
});
