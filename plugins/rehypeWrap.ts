import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element } from "hast";
import { visit } from "unist-util-visit";

export const rehypeWrapTables: RehypePlugin = () => {
    return (tree) => {
        visit(tree, "element", (node: Element, index, parent) => {
            if (
                node.tagName === "table" && parent && typeof index === "number"
            ) {
                const wrapper: Element = {
                    type: "element",
                    tagName: "div",
                    properties: { className: ["md-table-wrapper"] },
                    children: [node],
                };

                parent.children[index] = wrapper;
            }
        });
    };
};
