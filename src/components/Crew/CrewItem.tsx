import { cn } from "@/util/cn.ts";
import {
    component$,
    useComputed$,
    useSignal,
    useTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { assets, crewAssets, fontAssets } from "@kaplayjs/crew";
import type {
    CrewAsset,
    FontCrewAsset,
} from "node_modules/@kaplayjs/crew/dist/plugin";
import { Code } from "../Util/Code.tsx";

export interface CrewItemProps {
    crewItem: keyof typeof assets;
    isModal?: boolean;
}

const genderWord = [
    ["He", "Him", "His"],
    ["She", "Her", "Her"],
    ["They", "Them", "Their"],
];

export const CrewItem = component$<CrewItemProps>((props) => {
    const isModal = props.isModal ?? false;
    const isFromCrew = crewAssets[props.crewItem as unknown as CrewAsset];
    const isFromFont = fontAssets[props.crewItem as unknown as FontCrewAsset];
    const versionSelected = useSignal<"original" | "outlined">("original");
    const crewItem = assets[props.crewItem];

    return (
        <div
            class={cn({
                "h-full min-h-dvh w-full overflow-y-auto lg:mt-10 md:flex md:justify-center":
                    !isModal,
            })}
        >
            <div
                class={cn(
                    "flex h-full w-full gap-4 overflow-y-auto rounded-box bg-base-200 p-4 border border-base-content/15",
                    {
                        "lg:max-h-[80%] lg:max-w-[50%]": !isModal,
                    },
                )}
            >
                <div
                    class="mb-4"
                    onClick$={() => {
                        const dialog = document.querySelector<
                            HTMLDialogElement
                        >("#crew-modal");

                        dialog?.close();
                    }}
                >
                    <a
                        class="absolute top-2 right-2 p-2 bg-base-content/15 rounded-xl hover:bg-base-content/30 transition-colors focus:outline-none focus:ring-2 focus:ring-current"
                        href="/crew"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </a>
                </div>
                <div class="flex flex-1 flex-col gap-3 lg:p-6">
                    <div
                        class="tooltip flex gap-1 p-1 border border-base-content/15 rounded-xl"
                        data-tip={crewItem.secret}
                    >
                        <button
                            class={cn(
                                "flex-1 flex flex-col items-center pb-2 rounded-lg border-2 hover:bg-base-100 transition-colors focus:outline-none focus:border-current",
                                {
                                    "bg-base-100 border-primary":
                                        versionSelected.value == "original",
                                    " bg-base-300 border-base-300":
                                        versionSelected.value != "original",
                                },
                            )}
                            onClick$={() => {
                                versionSelected.value = "original";
                            }}
                        >
                            <span class="relative top-2 text-xs tracking-wide font-semibold">
                                Original
                            </span>
                            <img
                                src={crewItem.sprite}
                                alt={crewItem.name}
                                class="w-32 object-scale-down"
                            />
                        </button>

                        <button
                            class={cn(
                                "flex-1 flex flex-col items-center pb-2 rounded-lg border-2 hover:bg-base-100 transition-colors focus:outline-none focus:border-current",
                                {
                                    "bg-base-100 border-primary":
                                        versionSelected.value == "outlined",
                                    " bg-base-300 border-base-300":
                                        versionSelected.value != "outlined",
                                },
                            )}
                            onClick$={() => {
                                versionSelected.value = "outlined";
                            }}
                        >
                            <span class="relative top-2 text-xs tracking-wide font-semibold">
                                Outlined
                            </span>
                            <img
                                src={crewItem.outlined}
                                alt={crewItem.name}
                                class="w-32 object-scale-down"
                            />
                        </button>
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold text-white">
                            {crewItem.name}
                            <span class="badge badge-outline mx-2 text-base-content">
                                {crewItem.category}
                            </span>
                        </h2>
                        <p class="text-lg">by {crewItem.author}</p>

                        {crewItem.crewmeta && (
                            <>
                                <ul class="mt-5 lg:mt-7">
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.cake.outlined}
                                            alt="Age icon"
                                            class="h-5 w-5"
                                        />
                                        <span class="font-bold">Age:</span>{" "}
                                        {crewItem.crewmeta?.age}
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.weight.outlined}
                                            alt="Weight icon"
                                            class="h-5 w-5"
                                        />
                                        <span class="font-bold">Weight:</span>
                                        {" "}
                                        {crewItem.crewmeta
                                            ?.weight}kg
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.rule.outlined}
                                            alt="Height icon"
                                            class="h-5 w-5"
                                        />
                                        <span class="font-bold">Height:</span>
                                        {" "}
                                        {crewItem.crewmeta?.height}m
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.stranger.outlined}
                                            alt="Species icon"
                                            class="h-5 w-5"
                                        />
                                        <span class="font-bold">Species:</span>
                                        {" "}
                                        {crewItem.crewmeta?.species}
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div class="divider divider-horizontal m-0"></div>
                <div class="flex flex-1 flex-col gap-4 lg:p-6">
                    <p class="max-w-[40ch] text-balance mb-6">
                        {crewItem.description}{"  "}{crewItem.crewmeta && (
                            <>
                                <span>
                                    {crewItem.name} hobbies includes{" "}
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
                                    {crewItem.crewmeta.favoriteFood}, and{" "}
                                    {genderWord[
                                        crewItem.crewmeta.gender
                                    ][0].toLowerCase()}{"  "}loves the color
                                    {" "}
                                    {crewItem.crewmeta.favoriteColor}.
                                </span>
                            </>
                        )}
                    </p>

                    <div class="mt-auto">
                        {isFromCrew && (
                            <>
                                {versionSelected.value == "original"
                                    ? (
                                        <Code
                                            content={`loadCrew("${props.crewItem}");`}
                                            language="javascript"
                                            copyBtn
                                        />
                                    )
                                    : (
                                        <Code
                                            content={`loadCrew("${props.crewItem}-o");`}
                                            language="javascript"
                                            copyBtn
                                        />
                                    )}
                            </>
                        )}

                        {isFromFont && (
                            <>
                                <Code
                                    content={`loadCrewFont("${props.crewItem}");`}
                                    language="javascript"
                                    copyBtn
                                />
                            </>
                        )}

                        <btn
                            class="btn btn-outline btn-primary w-full"
                            onClick$={() => {
                                const a = document.createElement("a");
                                a.href = versionSelected.value == "original"
                                    ? crewItem.sprite
                                    : crewItem.outlined!;

                                const extra =
                                    versionSelected.value == "original"
                                        ? ""
                                        : "-o";

                                a.download = `${props.crewItem}${extra}.png`;
                                a.click();
                            }}
                        >
                            Download Sprite
                        </btn>
                    </div>
                </div>
            </div>
        </div>
    );
});
