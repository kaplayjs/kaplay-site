import { component$ } from "@builder.io/qwik";
import { assets } from "@kaplayjs/crew";

export interface CrewItemProps {
    crewItem: keyof typeof assets;
}

const genderWord = [
    ["He", "Him", "His"],
    ["She", "Her", "Her"],
    ["They", "Them", "Their"],
];

export const CrewItem = component$<CrewItemProps>((props) => {
    const crewItem = assets[props.crewItem];

    return (
        <div class="flex flex-col gap-2 h-full items-center justify-center">
            <div class="hidden lg:block">
                <btn
                    class="btn btn-sm btn-primary"
                    onClick$={() => {
                        window.history.back();
                    }}
                >
                    Back
                </btn>
            </div>
            <div class="h-full bg-base-200 p-2 flex flex-col lg:flex-row lg:border lg:rounded-box text-xl lg:max-h-[60%]">
                <div class="flex flex-col flex-1 p-6 gap-2">
                    <div
                        class="tooltip flex border border-primary rounded-box justify-around"
                        data-tip={crewItem.secret}
                    >
                        <img
                            src={crewItem.outlined}
                            alt={crewItem.name}
                            class="w-32 p-4 object-scale-down"
                        />
                        <img
                            src={crewItem.sprite}
                            alt={crewItem.name}
                            class="w-32 p-4 object-scale-down"
                        />
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold">
                            {crewItem.name}
                            <span class="badge badge-outline mx-2">
                                {crewItem.type}
                            </span>
                        </h2>
                        <p class="text-lg">by {crewItem.author}</p>

                        {crewItem.crewmeta && (
                            <>
                                <br />
                                <ul>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.cake.outlined}
                                            alt="Age icon"
                                            class="w-5 h-5"
                                        />
                                        <span class="font-bold">
                                            Age:
                                        </span>{" "}
                                        {crewItem.crewmeta?.age}
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.weight.outlined}
                                            alt="Weight icon"
                                            class="w-5 h-5"
                                        />
                                        <span class="font-bold">Weight:</span>
                                        {" "}
                                        {crewItem.crewmeta?.weight}kg
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.rule.outlined}
                                            alt="Height icon"
                                            class="w-5 h-5"
                                        />
                                        <span class="font-bold">Height:</span>
                                        {" "}
                                        {crewItem.crewmeta?.height}m
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <img
                                            src={assets.stranger.outlined}
                                            alt="Species icon"
                                            class="w-5 h-5"
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
                <div class="flex flex-col flex-1 p-6 gap-4">
                    <p class="max-w-[40ch] text-balance">
                        {crewItem.description}{"  "}{crewItem.crewmeta && (
                            <>
                                <span>
                                    {crewItem.name} hobbies includes{" "}
                                    {crewItem.crewmeta.hobbies.slice(0, -1)
                                        .join(
                                            ", ",
                                        )} {crewItem.crewmeta.hobbies.length > 1
                                        && "and"}{" "}
                                    {crewItem.crewmeta.hobbies.slice(-1)}.
                                </span>
                                <br />
                                <br />
                                <span>
                                    {genderWord[crewItem.crewmeta.gender][2]}
                                    {" "}
                                    favorite food is{" "}
                                    {crewItem.crewmeta.favoriteFood}, and{" "}
                                    {genderWord[crewItem.crewmeta.gender][0]
                                        .toLowerCase()}{"  "}loves the color
                                    {" "}
                                    {crewItem.crewmeta.favoriteColor}.
                                </span>
                            </>
                        )}
                    </p>
                    <btn
                        class="btn btn-primary btn-outline w-full"
                        onClick$={() => {
                            const a = document.createElement("a");
                            a.href = crewItem.sprite!;
                            a.download = `${props.crewItem}.png`;
                            a.click();
                        }}
                    >
                        Download Sprite
                    </btn>
                    <btn
                        class="btn btn-accent btn-outline w-full"
                        onClick$={() => {
                            const a = document.createElement("a");
                            a.href = crewItem.outlined!;
                            a.download = `${props.crewItem}-o.png`;
                            a.click();
                        }}
                    >
                        Download Outlined ver.
                    </btn>
                </div>
            </div>
        </div>
    );
});
