import { component$ } from "@builder.io/qwik";
import { JSDocDescription } from "./JSDocDescription";
import { JSDocTag } from "./JSDocTag";

type Props = {
    data?: any;
};

export const JSDoc = component$(({ data }: Props) => {
    const jsDoc = data.jsDoc || {};
    const tags = Object.entries<string[]>(jsDoc.tags || {}).map(
        ([tag, items]) => ({
            tag,
            items,
        }),
    );
    const fParams = data.parameters || [];
    const paramTag = tags.find((tag) => tag.tag === "param");
    const otherTags = tags.filter((tag) => tag.tag !== "param");

    return (
        <>
            {typeof jsDoc.doc === "object" ? (
                <JSDocDescription data={data} />
            ) : (
                <p class="pb-2">{jsDoc.doc}</p>
            )}
            {paramTag &&
                paramTag.items.map((item, i) => (
                    <JSDocTag
                        tag="param"
                        items={[item]}
                        paramName={fParams[i]?.name}
                    />
                ))}

            {otherTags &&
                otherTags?.map(({ items, tag }) => (
                    <JSDocTag tag={tag} items={items} />
                ))}
        </>
    );
});
