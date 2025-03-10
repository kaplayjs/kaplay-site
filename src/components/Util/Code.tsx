import {
    component$,
    useComputed$,
    useSignal,
    useTask$,
} from "@builder.io/qwik";
import { codeToHtml } from "shiki";
// @ts-ignore
import { addCopyButton } from "shiki-transformer-copy-button";

type Props = { content: string; language: string; copyBtn?: boolean };

async function highlight(
    content: string,
    language: string,
    useCopyButton?: boolean,
) {
    const file = await codeToHtml(content, {
        theme: "github-dark",
        lang: language,
        transformers: useCopyButton
            ? [
                addCopyButton({
                    toggle: 200,
                }),
            ]
            : [],
    });

    return file;
}

export const Code = component$((props: Props) => {
    const highlightedContent = useComputed$(async () => {
        if (!props.content) return;

        const content = await highlight(
            props.content,
            props.language,
            props.copyBtn,
        );

        return content;
    });

    return (
        <>
            <pre dangerouslySetInnerHTML={highlightedContent.value} />
        </>
    );
});
