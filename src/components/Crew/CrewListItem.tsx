import { assets } from "@/data/crew";

interface CrewListItemProps {
    crewItem: keyof typeof assets;
}

export const CrewListItem = (props: CrewListItemProps) => {
    const crewItem = assets[props.crewItem];

    return (
        <div class="relative group-crew-item flex min-[460px]:w-32 min-[460px]:h-32 flex-col items-center justify-center rounded-box bg-[rgb(50,56,68)]/50 p-4 hover:bg-base-content/10 transition-all">
            <div>
                {!crewItem?.["relatedSprite"]
                    ? (
                        <img
                            src={crewItem.kind == "Sound"
                                ? assets.sounds.outlined
                                : crewItem.outlined ?? crewItem.sprite}
                            alt={crewItem.name}
                            class="h-16 w-16 object-scale-down [.group-crew-item:hover_&]:scale-105 transition-transform"
                        />
                    )
                    : (
                        <>
                            <div class="h-16 w-16 grid place-items-center pt-2 [.group-crew-item:hover_&]:scale-105 transition-transform">
                                <img
                                    src={assets[crewItem["relatedSprite"]]
                                        .outlined}
                                    alt={crewItem["relatedSprite"]}
                                    class="h-12 w-12 object-scale-down"
                                />
                            </div>

                            <img
                                src={assets.sounds.outlined}
                                alt={crewItem.name}
                                class="absolute top-2.5 right-2.5 h-9 w-9 object-scale-down [.group-crew-item:hover_&]:scale-105 transition-transform"
                            />
                        </>
                    )}
            </div>

            <div>
                <h2 class="font-medium truncate max-w-[10ch]">
                    {crewItem.name}
                </h2>
            </div>
        </div>
    );
};
