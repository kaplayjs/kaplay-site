import { assets, type typeOptions } from "@/data/crew";

const typeIcons = {
    "All": assets.assetbrew.outlined,
    "Sprite": assets.art.outlined,
    "Sound": assets.sounds.outlined,
    "UI": assets.like.outlined,
};

interface CrewTabTriggersProps {
    active: typeOptions;
    tabs: Record<typeOptions, number>;
    onChange: (type: typeOptions) => void;
}

export const CrewTabsTriggers = (
    { active, tabs, onChange, ...props }: CrewTabTriggersProps,
) => {
    return (
        <div
            class="tabs tabs-lifted tabs-lg group -mx-px group-data-[minimized]:pr-12 w-auto bg-base-300 overflow-x-auto"
            {...props}
        >
            {Object.entries(tabs).map(([type, count]) => (
                <label
                    class="tab no-wrap w-full has-[:checked]:tab-active has-[:checked]:[--tab-bg:oklch(var(--b1)/60%)] px-6 text-sm hover:bg-base-200 transition-[background-color] has-[:checked]:last:before:!w-full  has-[:checked]:last:before:-left-[var(--tab-radius)]"
                    key={type}
                >
                    <input
                        type="radio"
                        name="type"
                        key={type}
                        aria-label={type}
                        class="appearance-none absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-content/40 rounded-t-[inherit] pointer-events-none"
                        checked={type == active}
                        onChange={() => onChange(type as typeOptions)}
                    />

                    <span className="flex gap-2 items-center justify-center">
                        {typeIcons[type] && (
                            <img
                                src={typeIcons[type]}
                                alt={type}
                                className="inline h-5 w-5 object-scale-down"
                            />
                        )}

                        <span className="inline font-medium">{type}</span>

                        <span className="badge badge-xs font-medium py-1 px-1 min-w-5 h-auto bg-base-content/15 border-0">
                            {count}
                        </span>
                    </span>
                </label>
            ))}

            {!props?.["data-maximized"] && (
                <span class="maximize-placeholder hidden"></span>
            )}
        </div>
    );
};
