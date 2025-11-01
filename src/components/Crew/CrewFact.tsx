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

const factsData = {
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
} satisfies Record<
	keyof (typeof assets)[keyof typeof assets]["crewmeta"],
	FactData
>;

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
				width: 720,
				height: 405,
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
			class="flex-1 rounded-box p-4 sm:p-8 flex lg:flex-none w-full h-full lg:my-2.5 2xl:my-10 lg:mx-auto max-w-5xl bg-base-200"
		>
			<div class="flex flex-col items-center justify-center gap-6 w-full">
				<div class="flex-1 flex flex-col items-center justify-center p-8"
					id="crew-fact-container"
				>
					<span class="text-lg text-white/70 head-badge-2">
						{new Date().toLocaleDateString("en-US", {
							weekday: "long", year: "numeric", month: "long", day: "numeric"
						})}
					</span>
					<p class="text-4xl font-bold mb-6 text-white">
						The <span class="font-hand font-normal text-transparent text-[2.55rem] bg-gradient-to-r from-[#abdd64] via-[#ffae84] to-[#bf7adf] bg-clip-text">Crew Fact</span> of the Day
					</p>
					<div class="flex flex-col">
						<div class="flex items-center justify-center w-36 h-36 rounded-xl bg-base-200/50 border-2 border-base-content/10">
							<img
								src={crewItem.kind == "Sprite" ? crewItem.outlined : "no"}
								alt={crewItem.name}
								class="w-24 h-24 object-contain"
								style="image-rendering: pixelated;"
							/>
						</div>
						<h2 class="text-xl text-center my-2">
							{crewItem.name}
						</h2>
					</div>
					<p class="text-2xl flex items-center justify-center gap-2">
						<img src={factsData.age.icon} alt="icon" class="inline scale-down h-8 mx-1" />
						<span>Today is his <span class="text-white">birthday</span></span>
						<img src={factsData.age.icon} alt="icon" class="inline scale-down h-8 mx-1" />
					</p>
					<p class="hidden text-2xl italic">
						{"“" + crewSecret + "”"}
					</p>
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

