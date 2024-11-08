import { Code } from "@/components/Util/Code";
import { component$ } from "@builder.io/qwik";

type Props = {
    tag: string;
    items: any[];
};

export const JSDocTag = component$(({ tag, items }: Props) => {
    const hiddenTags = ["group"];
    if (hiddenTags.includes(tag)) return;
    const item = items.flat()[0]?.text ?? "";

    switch (tag) {
        case "example":
            return (
                <Code
                    content={items.join("").replace(/^```js\s+|```$/g, "")}
                    language="tsx"
                />
            );
        default:
            return (
                <p class="prose gap-2">
                    <code class="inline mr-1">{tag}</code>
                    <span>{item}</span>
                </p>
            );
    }
});
