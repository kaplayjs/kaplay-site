import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element } from "hast";
import { visit } from "unist-util-visit";

export const rehypeKAPLAY: RehypePlugin = () => {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type != "element") {
                return;
            }

            const element = node as Element;

            if (!isAnchor(element)) {
                return;
            }

            const url = getUrl(element);

            if (isDoc(url)) {
                element.properties!["data-astro-reload"] = "all";
            }
        });
    };
};

const isAnchor = (element: Element) =>
    element.tagName == "a" && element.properties
    && "href" in element.properties;

const getUrl = (element: Element) => {
    if (!element.properties) {
        return "";
    }

    const url = element.properties["href"];

    if (!url) {
        return "";
    }

    return url.toString();
};

const isDoc = (url: string) => {
    return url.startsWith("/doc");
};
