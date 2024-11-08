import { component$ } from "@builder.io/qwik";
import { marked } from "marked";
import { TypeLink } from "./TypeLink";

type Props = {
    data?: any;
};

export const JSDocDescription = component$(({ data }: Props) => {
    const jsDoc = data?.jsDoc;
    const doc = jsDoc.doc ?? "";

    if (!jsDoc) return null;

    return (
        <p class="prose" data-pagefind-weight="4">
            {doc.map(async (e: any) => (
                <>
                    {e.kind === "JSDocText" && <>{e.text}</>}
                    {e.kind === "JSDocLink" && (
                        <TypeLink name={e.name}>
                            <span
                                dangerouslySetInnerHTML={await marked.parseInline(
                                    e.text,
                                    {},
                                )}
                            ></span>
                        </TypeLink>
                    )}
                </>
            ))}
        </p>
    );
});
