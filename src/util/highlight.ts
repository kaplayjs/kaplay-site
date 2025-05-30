import { codeToHtml } from "shiki";
// @ts-ignore
import { addCopyButton } from "shiki-transformer-copy-button";

export const highlight = async (
    code: string,
    language: string = "javascript",
    useCopyButton: boolean = true,
) => {
    return await codeToHtml(code, {
        theme: "github-dark",
        lang: language,
        transformers: useCopyButton
            ? [
                addCopyButton({
                    toggle: 400,
                }),
            ]
            : [],
    });
};
