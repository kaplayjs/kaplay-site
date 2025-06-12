import { type crewPacks, tagsMessages } from "@/data/crew";
import { cn } from "@/util/cn";
import { useState } from "preact/hooks";

type CrewListPackProps = {
    pack: typeof crewPacks[number];
    count: number;
    collapsed?: boolean;
    children: preact.ComponentChildren;
};

export const CrewListPack = (
    { pack, count, collapsed, children }: CrewListPackProps,
) => {
    const [open, setOpen] = useState<boolean>(!collapsed);

    return (
        <div
            class={cn(
                "collapse collapse-arrow px-1 rounded-none has-[:focus]:rounded-lg !-outline-offset-2",
                { "hidden": !count },
            )}
        >
            <input
                class="peer min-h-12"
                type="checkbox"
                checked={open}
                onChange={() => setOpen(!open)}
                autocomplete="off"
            />

            <div
                class={cn(
                    "collapse-title flex items-center gap-1.5 font-medium pl-0 pr-6 py-3.5 min-h-12 border-base-content/10 [.collapse:first-child_&,.collapse.hidden+.collapse_&]:border-t-0 [.collapse:not(.hidden)~.collapse_&]:border-t after:!top-7 after:!right-2 peer-hover:text-white transition-colors",
                    {
                        "text-base-content/50": pack == "Other",
                    },
                )}
            >
                <span class="badge badge-xs font-bold text-[inherit] text-[0.625rem] py-1 px-1 min-w-5 h-auto bg-base-content/15 border-0">
                    {count}
                </span>

                <div class="flex flex-wrap items-baseline gap-x-2">
                    <h3 class="capitalize">{pack}</h3>

                    {tagsMessages?.[pack.toLowerCase()] && (
                        <p className="self-baseline font-normal text-xs tracking-wide text-base-content/80">
                            {tagsMessages[
                                pack.toLowerCase()
                            ]}
                        </p>
                    )}
                </div>
            </div>

            <div class="collapse-content -mx-0.5 !p-0 -mt-4 peer-checked:!pt-5 [.collapse:not(:last-child)_&]:peer-checked:!pb-6">
                <div class="flex flex-wrap items-center justify-center gap-2">
                    {children}
                </div>
            </div>
        </div>
    );
};
