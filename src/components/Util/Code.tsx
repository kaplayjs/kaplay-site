import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { codeToHtml } from "shiki";

type Props = { content: string; language: string };

async function highlight(content: string, language: string) {
    const file = await codeToHtml(content, {
        theme: "github-dark",
        lang: language,
    });

    return file;
}

export const Code = component$((props: Props) => {
    const highlightedContent = useSignal("");

    useTask$(async () => {
        if (!props.content) return;
        const content = await highlight(props.content, props.language);
        highlightedContent.value = content;
    });
    return (
        <>
            <pre dangerouslySetInnerHTML={highlightedContent.value} />
        </>
    );
});
