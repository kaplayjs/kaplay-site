import { Code } from "@/components/Util/Code";
import { component$ } from "@builder.io/qwik";

type Props = {
    tag: string;
    items: any[];
    paramName?: string;
};

export const JSDocTag = component$(({ tag, items, paramName }: Props) => {
    const hiddenTags = ["group"];
    if (hiddenTags.includes(tag)) return;
    const item = items.flat()[0]?.text ?? items[0] ?? "";

    switch (tag) {
        case "example":
            return (
                <Code
                    content={items.join("").replace(/^```js\s+|```$/g, "")}
                    language="tsx"
                />
            );
        case "param":
            return (
                <p class="prose gap-2">
                    <code class="mr-1 inline">{tag}</code>
                    <span>{paramName ?? "unknown"} </span>
                    <span>{item}</span>
                </p>
            );
        case "experimental":
            return (
                <p class="prose gap-2">
                    <code class="mr-1 inline bg-warning text-warning-content">
                        {tag}
                    </code>
                    <span>{item}</span>
                </p>
            );
        default:
            return (
                <p class="prose gap-2">
                    <code class="mr-1 inline">{tag}</code>
                    <span>{item}</span>
                </p>
            );
    }
});
