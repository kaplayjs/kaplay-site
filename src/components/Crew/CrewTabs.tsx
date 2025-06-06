import { typeOptions } from "@/data/crew";
import { countByType } from "@/data/crew";
import { assets } from "@/data/crew";

const typeIcons = {
    "All": assets.assetbrew.outlined,
    "Sprite": assets.art.outlined,
    "Sound": assets.sounds.outlined,
    "UI": assets.like.outlined,
};

interface CrewTabProps {
    active: typeOptions;
    activeCount?: number;
    onChange: (type: typeOptions) => void;
}

export const CrewTabs = (
    { active, activeCount, onChange, ...props }: CrewTabProps,
) => {
    return (
        <div
            class="tabs tabs-lifted tabs-lg group -mx-px group-data-[minimized]:pr-12 w-auto bg-base-300 overflow-x-auto"
            {...props}
        >
            {typeOptions.map((type) => (
                <label
                    class="tab has-[:checked]:tab-active has-[:checked]:[--tab-bg:oklch(var(--b1)/60%)] px-6 text-sm hover:bg-base-200 transition-[background-color] has-[:checked]:last:before:!w-full last:before:-left-[var(--tab-radius)]"
                    key={type}
                >
                    <input
                        type="radio"
                        name="type"
                        key={type}
                        aria-label={type}
                        class="hidden"
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
                            {type == active
                                ? activeCount
                                : countByType(type as typeOptions)}
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
