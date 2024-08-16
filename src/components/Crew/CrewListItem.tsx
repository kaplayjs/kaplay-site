import { component$, useSignal } from "@builder.io/qwik";
import { assets } from "@kaplayjs/crew";

export interface CrewListItemProps {
    crewItem: keyof typeof assets;
}

export const CrewListItem = component$<CrewListItemProps>((props) => {
    const crewItem = assets[props.crewItem];

    return (
        <div class="rounded-box bg-base-200 p-4 w-32 flex items-center justify-center flex-col">
            <div>
                <img
                    src={crewItem.outlined}
                    alt={crewItem.name}
                    class="w-16 h-16 object-scale-down"
                />
            </div>

            <div>
                <h2 class="font-medium">{crewItem.name}</h2>
            </div>
        </div>
    );
});
