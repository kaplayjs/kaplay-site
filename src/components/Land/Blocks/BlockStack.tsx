import { cn } from "@/util/cn";
import { component$, Slot } from "@builder.io/qwik";

type Props = {
    hideOnMobile?: boolean;
};

export const BlockStack = component$<Props>(({ hideOnMobile }) => {
    return (
        <div
            class={cn("hidden w-full flex-col gap-2 lg:flex-row", {
                "lg:flex": hideOnMobile,
                flex: !hideOnMobile,
            })}
        >
            <Slot />
        </div>
    );
});
