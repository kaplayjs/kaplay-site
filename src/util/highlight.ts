import { codeToHtml } from "shiki";

export const highlight = async (
    code: string,
    language: string = "javascript",
) => {
    return await codeToHtml(code, {
        theme: "github-dark",
        lang: language,
    });
};
