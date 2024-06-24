import { component$ } from "@builder.io/qwik";
import { marked } from "marked";

type Props = {
    data?: any;
};

export const JSDocDescription = component$(({ data }: Props) => {
    const jsDoc = data?.jsDoc;
    const doc = jsDoc.doc ?? "";

    if (!jsDoc) return null;

    return (
        <p class="prose">
            {doc.map(async (e: any) => (
                <>
                    {e.kind === "JSDocText" && <>{e.text}</>}
                    {e.kind === "JSDocLink" && (
                        <a
                            class="text-primary decoration-transparent"
                            href={`#${e.name}`}
                            dangerouslySetInnerHTML={await marked.parseInline(
                                e.text,
                                {},
                            )}
                        >
                        </a>
                    )}
                </>
            ))}
        </p>
    );
});
