import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element } from "hast";
import { visit } from "unist-util-visit";
import { queryDoc } from "../tools/queryDoc";

export const rehypeKAPLAY: RehypePlugin = () => {
    return (tree) => {
        visit(tree, (node) => {
            if (node.type != "element") {
                return;
            }

            const element = node as Element;

            if (isBacktickCode(element)) {
                const firstChild = element.children[0];

                if (
                    element.children.length == 1
                    && firstChild.type == "text"
                ) {
                    let query = firstChild.value;

                    if (query.startsWith("&")) {
                        firstChild.value = query.slice(1);

                        return;
                    }

                    const queryResult = queryDoc(query);

                    if (queryResult) {
                        element.properties = {
                            ...element.properties,
                            class: element.properties.class + " md-doc-code",
                        };

                        element.children[0] = {
                            tagName: "a",
                            properties: {
                                href: queryResult.url,
                                class: "md-doc-code-link",
                            },
                            children: [
                                {
                                    type: "element",
                                    tagName: "span",
                                    properties: {
                                        class: "md-doc-code-span",
                                    },
                                    children: [
                                        {
                                            type: "text",
                                            value: queryResult.apiEntry,
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    tagName: "span",
                                    properties: {},
                                    children: [
                                        {
                                            type: "text",
                                            value: queryResult.extras,
                                        },
                                    ],
                                },
                            ],
                            type: "element",
                        };
                    }
                }
            }

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
    element.tagName == "a"
    && element.properties
    && "href" in element.properties;

const isBacktickCode = (element: Element, parent?: any) =>
    element.tagName == "code";

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
    return url.startsWith("/docs/api");
};
