import { assets } from "@/data/crew";

type CrewListItem404Props = {
    onClick: (
        crewItem: keyof typeof assets,
        e: preact.JSX.TargetedMouseEvent<HTMLAnchorElement>,
    ) => void;
};

const notFoundAssets = ["ghosty", "ghostiny", "beant", "skuller"];
let curNotFoundAsset = 0;

export const CrewListItem404 = ({ onClick }: CrewListItem404Props) => {
    const asset = notFoundAssets[
        (++curNotFoundAsset + notFoundAssets.length)
        % notFoundAssets.length
    ];

    return (
        <a
            class="flex flex-row items-center gap-4 lg:gap-6 mt-4 lg:mt-6 p-6 lg:p-8 rounded-box bg-[rgb(50,56,68)]/50 hover:bg-base-content/10 transition-all"
            href={`/crew/${asset}`}
            onClick={e => onClick(asset as keyof typeof assets, e)}
        >
            <img
                class="w-12 h-12 object-contain"
                src={assets[asset].outlined}
                alt={asset}
            >
            </img>

            <div class="mt-0.5">
                <h2 class="font-semibold text-lg leading-none text-error py-1">
                    <span class="mr-1.5">No items found</span>
                    <span class="font-medium text-sm tracking-wide opacity-50">
                        besides {asset}
                    </span>
                </h2>
                <p>Search again or try different filters</p>
            </div>
        </a>
    );
};
