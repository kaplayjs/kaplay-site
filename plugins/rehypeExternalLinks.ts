import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

type Options = {
    site: string;
};

export const rehypeExternalLinks: RehypePlugin = ({ site }: Options) => {
    return (tree) => {
        visit(tree, "element", (node) => {
            const href = node.properties?.href;
            if (
                node.tagName === "a"
                && typeof href === "string"
                && /^https?:\/\//i.test(href)
                && !new URL(href).hostname.includes(
                    new URL(site).hostname.split(".").pop()!,
                )
            ) {
                node.properties.target ??= "_blank";
                node.properties.rel ??= ["noopener", "noreferrer"];
            }
        });
    };
};
