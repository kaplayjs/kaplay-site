import { cn } from "@/util/cn";
import { component$, Slot } from "@builder.io/qwik";

type Props = {
    data?: any;
    parent?: string;
};

export const Title = ({ parent, data }: Props) => {
    return parent
        ? (
            <h2>
                <Slot />
            </h2>
        )
        : (
            <h1>
                <Slot />
            </h1>
        );
};

export const ReferenceEntry = component$(({ data, parent }: Props) => {
    return (
        <article
            id={`${parent}${data.name}`}
            class={cn("flex flex-col gal-1 text-fira", {
                "p-2": parent,
            })}
        >
            <Title></Title>
        </article>
    );
});

/**
 *
 * ---
import JSDoc from "../JSDoc/JSDoc.astro";
import TypeSignatureGenerics from "../TypeSig/TypeSignatureGenerics.astro";
import ReferenceMembers from "./Name/ReferenceMembers.astro";
import ReferenceName from "./Name/ReferenceName.astro";
import ReferenceParams, {
    optionalMark,
} from "./Name/ReferenceParams.astro";
import ReferenceReturn from "./Name/ReferenceReturn.astro";

export type Props = {
    data: any;
    parent?: string;
};

const { data, parent = "" } = Astro.props;
const Title = parent ? "h2" : "h1";
---

<article
    class="flex flex-col gap-1 text-fira"
    class:list={{
        "p-2": parent,
    }}
    id={`${parent}${data.name}`}
>
    <Title
        class:list={{
            "text-xl": !parent,
            "text-lg": parent,
        }}
    >
        <ReferenceName {data} {parent} /><TypeSignatureGenerics {data} />{
            optionalMark(data)
        }<ReferenceParams {data} /><ReferenceReturn {data} />
    </Title>
    <JSDoc {data} />
    <ReferenceMembers {data} />
</article>

 */
