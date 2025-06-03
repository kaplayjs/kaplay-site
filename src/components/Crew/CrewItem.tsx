import { assets } from "@/data/crew";
import { cn } from "@/util/cn.ts";
import { useState } from "preact/hooks";

export interface CrewItemProps {
    crewItem?: keyof typeof assets;
    isModal?: boolean;
}

const genderWord = [
    ["He", "Him", "His"],
    ["She", "Her", "Her"],
    ["They", "Them", "Their"],
];

export const CrewItem = (props: CrewItemProps) => {
    const isModal = props.isModal ?? false;
    const [versionSelected, setVersionSelected] = useState<
        "original" | "outlined"
    >("original");

    if (!props.crewItem) {
        return <div>loading...</div>;
    }

    const crewItem = assets[props.crewItem];

    if (!crewItem.outlined) setVersionSelected("original");

    return (
        <div
            class={cn(
                "flex-1 rounded-box bg-base-200 p-4 sm:p-8 border border-base-content/15",
                {
                    "flex lg:flex-none w-full h-full lg:my-10 lg:mx-auto max-w-5xl":
                        !isModal,
                    "overflow-y-auto": isModal,
                },
            )}
        >
            <div
                class={cn(
                    "flex flex-col sm:flex-row w-full gap-4",
                )}
            >
                <div class="flex sm:flex-1 flex-col gap-3.5 lg:p-6">
                    <div
                        class="tooltip tooltip-bottom sm:tooltip-top flex gap-1 p-1 border border-base-content/15 rounded-xl max-sm:before:top-auto max-sm:before:-bottom-2.5 max-sm:after:hidden"
                        data-tip={crewItem.secret || undefined}
                    >
                        <button
                            class={cn(
                                "flex-1 flex flex-col items-center pb-2 rounded-lg border-2 hover:bg-base-100 transition-colors focus:outline-none focus-visible:border-current",
                                {
                                    "bg-base-100 border-primary":
                                        versionSelected == "original"
                                        && crewItem.outlined,
                                    "bg-base-100 border-base-300": !crewItem
                                        .outlined,
                                    "bg-base-300 border-base-300":
                                        versionSelected != "original",
                                },
                            )}
                            type="button"
                            onClick={() => setVersionSelected("original")}
                        >
                            {crewItem.outlined && (
                                <span class="relative top-2 text-xs tracking-wide font-semibold">
                                    Original
                                </span>
                            )}
                            <img
                                src={crewItem.sprite}
                                alt={crewItem.name}
                                class="w-32 object-scale-down py-4"
                            />
                        </button>

                        {crewItem.outlined && (
                            <button
                                class={cn(
                                    "flex-1 flex flex-col items-center pb-2 rounded-lg border-2 hover:bg-base-100 transition-colors focus:outline-none focus-visible:border-current",
                                    {
                                        "bg-base-100 border-primary":
                                            versionSelected == "outlined",
                                        "bg-base-300 border-base-300":
                                            versionSelected != "outlined",
                                    },
                                )}
                                type="button"
                                onClick={() => setVersionSelected("outlined")}
                            >
                                <span class="relative top-2 text-xs tracking-wide font-semibold">
                                    Outlined
                                </span>
                                <img
                                    src={crewItem.outlined}
                                    alt={crewItem.name}
                                    class="w-32 object-scale-down py-4"
                                />
                            </button>
                        )}
                    </div>

                    <div>
                        <h2 class="flex items-center gap-2 text-2xl font-bold text-white">
                            {crewItem.name}
                            <span class="badge badge-outline text-base-content mt-1 px-1.5 h-auto bg-base-content/10 border-base-content/15">
                                {crewItem.pack}
                            </span>
                        </h2>
                        <p class="text-md">by {crewItem.author}</p>

                        {crewItem.crewmeta && (
                            <ul class="columns-[10rem] gap-2 mt-5 lg:mt-7 space-y-1">
                                <li class="flex items-center gap-2">
                                    <img
                                        src={assets.cake.outlined}
                                        alt="Age icon"
                                        class="h-5 w-5"
                                    />
                                    <span class="font-bold min-w-14">Age</span>
                                    {" "}
                                    {crewItem.crewmeta.age}
                                </li>
                                <li class="flex items-center gap-2">
                                    <img
                                        src={assets.weight.outlined}
                                        alt="Weight icon"
                                        class="h-5 w-5"
                                    />
                                    <span class="font-bold min-w-14">
                                        Weight
                                    </span>{" "}
                                    {crewItem.crewmeta?.weight}kg
                                </li>
                                <li class="flex items-center gap-2">
                                    <img
                                        src={assets.rule.outlined}
                                        alt="Height icon"
                                        class="h-5 w-5"
                                    />
                                    <span class="font-bold min-w-14">
                                        Height
                                    </span>{" "}
                                    {crewItem.crewmeta?.height}m
                                </li>
                                <li class="flex items-center gap-2">
                                    <img
                                        src={assets.stranger.outlined}
                                        alt="Species icon"
                                        class="h-5 w-5"
                                    />
                                    <span class="font-bold min-w-14">
                                        Species
                                    </span>{" "}
                                    {crewItem.crewmeta?.species}
                                </li>
                            </ul>
                        )}
                    </div>

                    {isModal && (
                        <div class="mt-auto pt-4">
                            <a
                                class="inline-flex gap-2 items-center font-medium text-sm px-0.5 hover:text-primary transition-colors rounded-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
                                href={`/crew/${props.crewItem}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    class="shrink-0"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M15 3h6v6" />
                                    <path d="M10 14 21 3" />
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                </svg>

                                Open in new page
                            </a>
                        </div>
                    )}
                </div>

                <div class="max-sm:hidden flex-none divider divider-horizontal before:w-px after:w-px m-0">
                </div>
                <div class="sm:hidden flex-none divider divider-vertical before:h-px after:h-px m-0">
                </div>

                <div class="contents sm:flex sm:flex-1 flex-col min-h-max gap-8 lg:p-6">
                    <div class="space-y-2">
                        <h3 class="font-bold">
                            About {crewItem.name}
                        </h3>
                        <p class="max-w-[40ch] text-balance mb-6">
                            {crewItem.description} {crewItem.crewmeta && (
                                <>
                                    <span>
                                        {crewItem.name} hobbies include{" "}
                                        {crewItem.crewmeta.hobbies
                                            .slice(0, -1)
                                            .join(", ")}{" "}
                                        {crewItem.crewmeta.hobbies.length > 1
                                            && "and"}{" "}
                                        {crewItem.crewmeta.hobbies.slice(-1)}.
                                    </span>
                                    <br />
                                    <br />
                                    <span>
                                        {genderWord[crewItem.crewmeta.gender][
                                            2
                                        ]} favorite food is{" "}
                                        {crewItem.crewmeta.favoriteFood}, and
                                        {" "}
                                        {genderWord[crewItem.crewmeta.gender][0]
                                            .toLowerCase()} loves the color{" "}
                                        {crewItem.crewmeta.favoriteColor}.
                                    </span>
                                </>
                            )}
                        </p>
                    </div>

                    <div
                        class={cn(
                            "sticky top-80 flex flex-col grow max-sm:mt-3 z-10",
                            {
                                "bottom-0": isModal,
                                "bottom-4": !isModal,
                            },
                        )}
                    >
                        <div class="sm:sticky bottom-2 lg:bottom-6 mt-auto space-y-2 max-sm:bg-base-100 rounded-lg max-sm:p-4 max-sm:-mx-4 max-sm:-mb-4 max-sm:border-t border-base-content/10 max-sm:shadow-[0_0_50px_0_rgba(0,0,0,0.2)]">
                            {crewItem.imports.importInCrew
                                && crewItem.imports
                                    .importInCrew[versionSelected]
                                && (
                                    <div class="mb-2.5">
                                        <h3 class="text-xs font-semibold tracking-wider">
                                            Crew Import
                                        </h3>

                                        <div
                                            class="text-sm m-0 -mx-0.5 p-0 [--rounded-box:0.75rem] [&>.shiki]:!pr-10 [&>.shiki]:whitespace-normal"
                                            dangerouslySetInnerHTML={{
                                                __html: crewItem.imports
                                                    .importInCrew[
                                                        versionSelected
                                                    ],
                                            }}
                                        />
                                    </div>
                                )}

                            {crewItem.imports.importInPG
                                && crewItem.imports.importInPG[versionSelected]
                                && (
                                    <div class="mb-2.5">
                                        <h3 class="text-xs font-semibold tracking-wider">
                                            KAPLAYGROUND Import
                                        </h3>

                                        <div
                                            class="text-sm m-0 -mx-0.5 p-0 [--rounded-box:0.75rem] [&>.shiki]:!pr-10 [&>.shiki]:whitespace-normal"
                                            dangerouslySetInnerHTML={{
                                                __html: crewItem.imports
                                                    .importInPG[
                                                        versionSelected
                                                    ],
                                            }}
                                        />
                                    </div>
                                )}

                            <button
                                class="btn btn-outline btn-primary w-full border-2"
                                type="button"
                                onClick={() => {
                                    const a = document.createElement("a");
                                    a.href = versionSelected == "original"
                                        ? crewItem.sprite
                                        : crewItem.outlined!;
                                    const extra = versionSelected == "original"
                                        ? ""
                                        : "-o";
                                    a.download =
                                        `${props.crewItem}${extra}.png`;
                                    a.click();
                                }}
                            >
                                Download Sprite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
