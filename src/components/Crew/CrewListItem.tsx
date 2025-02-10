import { component$, useSignal } from "@builder.io/qwik";
import { assets } from "@kaplayjs/crew";

export interface CrewListItemProps {
    crewItem: keyof typeof assets;
}

export const CrewListItem = component$<CrewListItemProps>((props) => {
    const crewItem = assets[props.crewItem];

    return (
        <div class="flex w-32 flex-col items-center justify-center rounded-box bg-base-100 p-4">
            <div>
                <img
                    src={crewItem.outlined}
                    alt={crewItem.name}
                    class="h-16 w-16 object-scale-down"
                />
            </div>

            <div>
                <h2 class="font-medium">{crewItem.name}</h2>
            </div>
        </div>
    );
});
