import { component$ } from "@builder.io/qwik";
import { JSDocDescription } from "./JSDocDescription";
import { JSDocTag } from "./JSDocTag";

type Props = {
    data?: any;
};

export const JSDoc = component$(({ data }: Props) => {
    const jsDoc = data.jsDoc || {};
    return (
        <>
            {typeof jsDoc.doc === "object"
                ? <JSDocDescription data={data} />
                : jsDoc.doc}
            {jsDoc.tags
                && Object.entries(jsDoc?.tags)?.map(([name, items]) => (
                    <JSDocTag tag={name} items={items as string[]} />
                ))}
        </>
    );
});
