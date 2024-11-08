import { cn } from "@/util/cn";
import { component$, Slot } from "@builder.io/qwik";
import { JSDoc } from "./JSDoc";
import { TypeGenerics } from "./TypeGenerics";
import { TypeMembers } from "./TypeMembers";
import { TypeName } from "./TypeName";
import { TypeParams } from "./TypeParams";
import { TypeReturn } from "./TypeReturn";

type Props = {
    data?: any;
    parent?: string;
};

export const optionalMark = (data: any) => {
    return data.questionToken ? "?" : "";
};

export const Title = ({ parent }: Props) => {
    return parent ? (
        <h2
            class={cn({
                "text-xl": !parent,
                "text-lg": parent,
            })}
        >
            <Slot />
        </h2>
    ) : (
        <h1
            class={cn({
                "text-xl": !parent,
                "text-lg": parent,
            })}
        >
            <Slot />
        </h1>
    );
};

export const DocEntry = component$(({ data, parent }: Props) => {
    const parentText = parent ? `${parent}-` : "";

    return (
        <article
            id={`${parentText}${data.name}`}
            class={cn("gal-1 text-fira flex flex-col", {
                "p-2": parent,
            })}
        >
            <h1
                class={cn({
                    "text-xl": !parent,
                    "text-lg": parent,
                })}
            >
                <TypeName data={data} parent={parent} />
                <TypeGenerics data={data} />
                {optionalMark(data)}
                <TypeParams data={data} />
                <TypeReturn data={data} />
            </h1>
            <JSDoc data={data} />
            <TypeMembers data={data} />
        </article>
    );
});
