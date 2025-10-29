import { assets } from "@/data/crew";
import domtoImage from "dom-to-image";

export interface CrewItemProps {
	crewItem?: keyof typeof assets;
}

type FactData = {
	icon: string;
	tooltip?: string;
	tooltipCheck?: (value: string | number) => boolean;
	suffix?: string;
};

const factsData: Record<
	keyof (typeof assets)[keyof typeof assets]["crewmeta"],
	FactData
> = {
	birthday: {
		icon: assets.egg_crack.outlined,
		tooltip: "Day/Month",
		tooltipCheck: (value: string) => value.includes("/"),
	},
	age: {
		icon: assets.cake.outlined,
	},
	height: {
		icon: assets.rule.outlined,
		suffix: "m",
	},
	weight: {
		icon: assets.weight.outlined,
		suffix: "kg",
	},
	species: {
		icon: assets.stranger.outlined,
	},
	origin: {
		icon: assets.portal.outlined,
	},
};

const genderWord = [
	["He", "Him", "His"],
	["She", "Her", "Her"],
	["They", "Them", "Their"],
];

export const CrewFact = (
	{ crewItem: crewItemKey, }: CrewItemProps,
) => {
	if (!crewItemKey) {
		return <div>loading...</div>;
	}

	const crewItem = assets[crewItemKey];
	const crewSecret = crewItem.secret;

	const handleDownload = () => {
		const node = document.getElementById("crew-fact-container");
		if (!node) return;

		domtoImage
			.toPng(node, {
				bgcolor: "#2a303c",
			})
			.then((dataUrl) => {
				const link = document.createElement("a");
				link.download = `crew-fact.png`;
				link.href = dataUrl;
				link.click();
			}
			);
	};


	return (
		<div
			class="flex-1 rounded-box p-4 sm:p-8 flex lg:flex-none w-full h-full lg:my-2.5 2xl:my-10 lg:mx-auto max-w-5xl"
		>
			<div class="flex flex-col items-center justify-center gap-6 w-full">
				<div class="flex-1 flex flex-col items-center justify-center gap-4 p-8"
					id="crew-fact-container"
				>
					<h2 class="text-4xl font-semibold mb-2">
						The <span class="font-hand">Crew Fact</span> of the Day
					</h2>
					<div class="flex flex-col">
						<div class="flex items-center justify-center w-36 h-36 rounded-xl bg-base-200/50 border-2 border-base-content/10">
							<img
								src={crewItem.kind == "Sprite" ? crewItem.outlined : "no"}
								alt={crewItem.name}
								class="w-24 h-24 object-contain"
								style="image-rendering: ;"
							/>
						</div>
						<h2 class="text-2xl font-bold text-white text-center">
							{crewItem.name}
						</h2>
					</div>
					<p class="text-base-content/70 mb-4 lg:mb-0 text-2xl italic ">
						“{crewSecret}”</p>
				</div>

				<div>
					<button class="btn" onClick={handleDownload}>
						Download
					</button>
				</div>
			</div>
		</div>
	);
};

