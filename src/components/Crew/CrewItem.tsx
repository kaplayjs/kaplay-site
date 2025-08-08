import { assets } from "@/data/crew";
import { cn } from "@/util/cn.ts";
import { useState } from "preact/hooks";
import { AudioPlayer } from "../Util/AudioPlayer";

export interface CrewItemProps {
    crewItem?: keyof typeof assets;
    isModal?: boolean;
    openModal?: (item: keyof typeof assets) => void;
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

export const CrewItem = (
    { crewItem: crewItemKey, isModal = false, openModal }: CrewItemProps,
) => {
    const [versionSelected, setVersionSelected] = useState<
        "original" | "outlined"
    >("original");

    if (!crewItemKey) {
        return <div>loading...</div>;
    }

    const crewItem = assets[crewItemKey];

    const facts = crewItem.crewmeta
        ? Object.fromEntries([
            ...Object.keys(factsData).filter(k => k in crewItem.crewmeta!),
        ].map(k => [k, crewItem.crewmeta![k]]))
        : undefined;

    if (!("outlined" in crewItem)) setVersionSelected("original");

    const supportsImport =
        ("sprite" in crewItem && crewItem.sprite?.includes("/gif")
            ? crewItem?.["loadSpriteOpt"]?.anims
            : true)
        || !("sprite" in crewItem);

    const swapModal = (item: keyof typeof assets) => {
        if (!isModal || !openModal) return;

        const dialog = document.querySelector<HTMLDialogElement>("#crew-modal");

        if (!dialog) {
            openModal(item);
            return;
        }

        dialog.addEventListener("transitionend", () => openModal(item), {
            once: true,
        });
        dialog?.close();
    };

    return (
        <div
            class={cn(
                "flex-1 rounded-box bg-base-200 p-4 sm:p-8 border border-base-content/15",
                {
                    "flex lg:flex-none w-full h-full lg:my-2.5 2xl:my-10 lg:mx-auto max-w-5xl":
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
                        {crewItem.kind != "Sound" && (
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
                                    class="w-32 max-h-48 object-scale-down py-4"
                                />
                            </button>
                        )}

                        {crewItem.kind != "Sound" && crewItem.outlined && (
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
                                    class="w-32 max-h-48 object-scale-down py-4"
                                />
                            </button>
                        )}

                        {crewItem.kind == "Sound" && (
                            <AudioPlayer
                                src={crewItem.sound}
                                bgImage={crewItem?.["relatedSprite"]
                                        && assets?.[crewItem?.["relatedSprite"]]
                                            ?.outlined || undefined}
                            />
                        )}
                    </div>

                    <div>
                        <div class="flex items-center gap-2">
                            <h2 class="text-2xl font-bold text-white">
                                {crewItem.name}
                            </h2>

                            {crewItem.aliases?.length && (
                                <div class="dropdown dropdown-right flex flex-col items-center -ml-1 pt-0.5">
                                    <div
                                        class="btn btn-ghost p-0 h-auto min-h-0 bg-base-50 border-base-content/10 rounded-md focus:bg-base-content/20 focus:border-transparent focus:rounded-box focus:pointer-events-none"
                                        role="button"
                                        aria-label="Aliases"
                                        tabindex={0}
                                    >
                                        <svg
                                            class="[.dropdown:has(:focus)_&]:-rotate-90 transition-transform"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>

                                    <div
                                        class="dropdown-content -mt-1.5 ml-1 bg-base-100 rounded-box z-[1] min-w-40 py-2 px-3 space-y-1 shadow-2xl"
                                        tabindex={0}
                                    >
                                        <h3 class="font-semibold text-xs tracking-wide">
                                            Aliases / Known As
                                        </h3>

                                        <ul class="flex flex-col items-start gap-1">
                                            {crewItem.aliases.map(alias => (
                                                <li
                                                    class={cn(
                                                        "tooltip text-left text-sm before:-left-2 before:translate-x-0 decoration-1 decoration-dotted decoration-base-content/25 underline-offset-4",
                                                        {
                                                            "underline": alias
                                                                ?.description,
                                                        },
                                                    )}
                                                    data-tip={alias?.description
                                                        ?? undefined}
                                                >
                                                    {alias.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <span class="badge badge-outline font-bold text-base-content mt-1 px-1.5 h-auto bg-base-content/10 border-base-content/5">
                                {crewItem.pack}
                            </span>
                        </div>

                        <p class="text-md">by {crewItem.author}</p>

                        {(facts || crewItem.appearances
                            || crewItem?.["relatedSprite"]
                            || crewItem?.["relatedSound"]) && (
                            <ul class="flex flex-wrap gap-x-4 gap-y-2 mt-5 lg:mt-7">
                                {facts
                                    && Object.entries(facts).map((
                                        [key, value],
                                    ) => (
                                        <li
                                            class="tooltip flex gap-2 items-start grow basis-[calc(50%-1rem)] min-w-fit text-left data-[tip]:underline decoration-1 decoration-dotted decoration-base-content/25 underline-offset-4"
                                            data-tip={(factsData?.[key]?.tooltip
                                                        && (factsData?.[key]
                                                            ?.tooltipCheck(
                                                                value,
                                                            ) ?? true))
                                                    && factsData[key].tooltip
                                                || undefined}
                                        >
                                            <span class="flex gap-2 items-center">
                                                <img
                                                    src={factsData?.[key]?.icon
                                                        ?? assets.question_mark
                                                            .outlined}
                                                    class="h-5 w-5 object-contain"
                                                    aria-hidden="true"
                                                />
                                                <span class="font-bold min-w-16">
                                                    {key.charAt(0)
                                                        .toUpperCase()}
                                                    {key.substring(1)}
                                                </span>
                                            </span>
                                            {value}
                                            {factsData?.[key]?.suffix}
                                        </li>
                                    ))}

                                {crewItem?.["relatedSound"] && (
                                    <li class="flex flex-wrap gap-2 items-start grow basis-[calc(50%-1rem)] min-w-fit">
                                        <span class="flex gap-2 items-center text-left">
                                            <img
                                                src={assets.sounds.outlined}
                                                class="h-5 w-5 object-contain"
                                                aria-hidden="true"
                                            />
                                            <span class="font-bold min-w-16">
                                                Sound
                                            </span>
                                        </span>

                                        <a
                                            class="link-primary link-hover underline-offset-4 transition-all"
                                            href={`/crew/${
                                                crewItem["relatedSound"]
                                            }`}
                                            {...(isModal && {
                                                onClick: e => {
                                                    e.preventDefault();
                                                    swapModal(
                                                        crewItem[
                                                            "relatedSound"
                                                        ],
                                                    );
                                                },
                                            })}
                                        >
                                            {assets[crewItem["relatedSound"]]
                                                .name}
                                        </a>
                                    </li>
                                )}

                                {crewItem?.["relatedSprite"] && (
                                    <li class="flex flex-wrap gap-2 items-start grow basis-[calc(50%-1rem)] min-w-fit">
                                        <span class="flex gap-2 items-center text-left">
                                            <img
                                                src={assets[
                                                    crewItem["relatedSprite"]
                                                ].outlined}
                                                class="h-5 w-5 object-contain"
                                                aria-hidden="true"
                                            />
                                            <span class="font-bold min-w-16">
                                                Related Sprite
                                            </span>
                                        </span>

                                        <a
                                            class="link-primary link-hover underline-offset-4 transition-all"
                                            href={`/crew/${
                                                crewItem["relatedSprite"]
                                            }`}
                                            {...(isModal && {
                                                onClick: e => {
                                                    e.preventDefault();
                                                    swapModal(
                                                        crewItem[
                                                            "relatedSprite"
                                                        ],
                                                    );
                                                },
                                            })}
                                        >
                                            {assets[crewItem["relatedSprite"]]
                                                .name}
                                        </a>
                                    </li>
                                )}

                                {crewItem.appearances && (
                                    <li class="flex flex-wrap gap-2 items-start grow basis-[calc(50%-1rem)] min-w-fit">
                                        <span
                                            class="tooltip flex gap-2 items-center text-left before:max-w-48 data-[tip]:underline decoration-1 decoration-dotted decoration-base-content/25 underline-offset-4 before:left-0 before:translate-x-0"
                                            data-tip="Green is Canon / Officially Acknowledged™"
                                        >
                                            <img
                                                src={assets.door.outlined}
                                                class="h-5 w-5 object-contain"
                                                aria-hidden="true"
                                            />
                                            <span class="font-bold min-w-16">
                                                Appearances
                                            </span>
                                        </span>

                                        <span>
                                            {crewItem.appearances.map((
                                                item,
                                                i,
                                            ) => [
                                                i > 0 && ", ",
                                                <a
                                                    class={cn(
                                                        "tooltip before:z-50 before:max-w-60 after:z-50 underline decoration-1 decoration-dotted decoration-base-content/25 underline-offset-4 hover:decoration-solid hover:decoration-current transition-all",
                                                        {
                                                            "link-primary":
                                                                item.canon,
                                                        },
                                                        {
                                                            "link-secondary":
                                                                !item.canon,
                                                        },
                                                    )}
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-tip={item.description}
                                                >
                                                    {item.name}
                                                </a>,
                                            ])}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {isModal && (
                        <div class="mt-auto pt-4">
                            <a
                                class="inline-flex gap-2 items-center font-medium text-sm px-0.5 hover:text-primary transition-colors rounded-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content"
                                href={`/crew/${crewItemKey}`}
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

                                Open in new tab
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
                        <h3 class="font-bold mt-1">
                            About {crewItem.name}
                        </h3>
                        <p class="max-w-[40ch] text-balance mb-6">
                            {crewItem.description.trim().replace(
                                /([^.?!])$/,
                                "$1.",
                            )} {crewItem.crewmeta && (
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
                                            .toLowerCase()}{" "}
                                        love{crewItem.crewmeta.gender < 2
                                            && "s"} the color{" "}
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
                            {supportsImport
                                && crewItem.imports.importInCrew
                                && crewItem.imports
                                    .importInCrew[versionSelected]
                                && (
                                    <div class="mb-2.5">
                                        <h3 class="text-xs font-semibold tracking-wider">
                                            <a
                                                href="https://github.com/kaplayjs/crew"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="inline-flex gap-1 items-center hover:text-primary transition-colors tooltip before:font-normal before:text-left before:tracking-normal before:-left-2 before:translate-x-0 before:py-1.5 after:left-auto after:right-1 after:translate-x-0"
                                                data-tip="First, npm install @kaplayjs/crew and import {&nbsp;crew&nbsp;} into KAPLAY plugins"
                                            >
                                                Crew Plugin Import

                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                    />
                                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                    <path d="M12 17h.01" />
                                                </svg>
                                            </a>
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

                            {supportsImport
                                && crewItem.imports.importInPG
                                && crewItem.imports
                                    .importInPG[versionSelected]
                                && (
                                    <div class="mb-2.5">
                                        <h3 class="text-xs font-semibold tracking-wider">
                                            <a
                                                href="https://play.kaplayjs.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="hover:text-primary transition-colors"
                                            >
                                                KAPLAYGROUND
                                            </a>{" "}
                                            Import
                                        </h3>

                                        <div
                                            class="relative text-sm my-2 -mx-0.5 p-0 rounded-box overflow-hidden [--rounded-box:0.75rem] [&>.shiki]:whitespace-pre-wrap [&>.shiki]:max-h-36 [&>.shiki]:!my-0 [&>.shiki]:static"
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
                                onClick={crewItem.kind != "Sound"
                                    ? () => {
                                        const a = document.createElement("a");
                                        a.href = versionSelected == "original"
                                            ? crewItem.sprite
                                            : crewItem.outlined;
                                        const suffix =
                                            versionSelected == "original"
                                                ? ""
                                                : "-o";
                                        a.download =
                                            `${crewItemKey}${suffix}.png`;
                                        a.click();
                                    }
                                    : () => {
                                        const a = document.createElement("a");
                                        a.href = crewItem.sound;
                                        a.download = `${crewItemKey}.${
                                            crewItem?.fileFormat || "mp3"
                                        }`;
                                        a.click();
                                    }}
                            >
                                Download {crewItem.kind}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
