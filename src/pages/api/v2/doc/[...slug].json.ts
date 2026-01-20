import DocEntry from "@/components/Doc/DocEntry.astro";
import doc from "@/data/generated/docs.json";
import type { APIContext } from "astro";
import { experimental_AstroContainer } from "astro/container";
import * as cheerio from "cheerio";
const container = await experimental_AstroContainer.create();

export async function getStaticPaths() {
    const allDoc: any = doc.types;
    const allDocKeys: string[] = Object.keys(allDoc).filter(
        (k) => k !== "KAPLAYCtx" && k !== "KaboomCtx" && k !== "undefined",
    );
    const kaboomDoc: any = allDoc.KaboomCtx?.[0].members
        ?? allDoc.KAPLAYCtx?.[0].members;
    const allKaboomDocKeys: string[] = Object.keys(kaboomDoc).map((k) => {
        return `ctx.${k}`;
    });

    return [...allDocKeys, ...allKaboomDocKeys].map((key) => {
        return {
            params: { slug: key },
        };
    });
}

type JSDocTag = {
    name: string;
    value: string;
};

type DocEntryData = {
    name: string;
    queryName: string;
    title: string;
    children: DocEntryData[];
    description?: string;
    example?: string[];
    tags?: JSDocTag[];
};

export async function GET({ params }: APIContext) {
    const slug = params.slug!;
    const allDoc: any = doc.types;
    let type: any[] = [];

    if (slug.startsWith("ctx.")) {
        const kaboomDoc: any = allDoc.KaboomCtx?.[0].members
            ?? allDoc.KAPLAYCtx?.[0].members;

        type = kaboomDoc[slug.replace("ctx.", "")];
    } else {
        type = allDoc[slug];
    }

    const getDocData = (html: string): DocEntryData => {
        const $ = cheerio.load(html);

        const mainEntry = $("[data-doc-entry]");
        const name = mainEntry.attr("data-doc-entry-name") || "";
        const titleEl = mainEntry.find("[data-doc-entry-title]").first();
        const title = titleEl.text() || "No Title";

        const children = mainEntry.find("[data-doc-entry-children]").map(
            (_, elem) => {
                return getDocData($(elem).toString() || "");
            },
        );

        const example = mainEntry.find("[data-jsdoc-example]").first();
        let exampleLines: string[] = [];

        example.find("span.line").each((_, codeElem) => {
            // Check if the closest article is the current mainEntry
            const closestArticle = $(codeElem).closest(
                "article[data-doc-entry]",
            );

            if (closestArticle[0] !== mainEntry[0]) {
                return;
            }

            const codeText = $(codeElem).text();
            exampleLines.push(codeText);
        });

        let description = mainEntry.find("[data-jsdoc-description]").first()
            .text().trim();

        let tags: { name: string; value: string }[] = [];

        mainEntry.find("[data-jsdoc-tag]").each((_, tagElem) => {
            const tag = $(tagElem);

            const closestArticle = tag.closest(
                "article[data-doc-entry]",
            );

            if (closestArticle[0] !== mainEntry[0]) {
                return;
            }

            const tagName = tag.find("[data-jsdoc-name]").text().trim();
            const tagValue = tag.find("[data-jsdoc-value]").text()
                .trim();
            const tagDescribe = tag.find("[data-jsdoc-describe]").text()
                .trim();

            if (tagDescribe) {
                tags.push({
                    name: tagName,
                    value: `${tagDescribe} ${tagValue}`,
                });
                return;
            }

            tags.push({ name: tagName, value: tagValue });
        });

        const data: DocEntryData = {
            name: name,
            queryName: slug,
            title: title,
            children: children.toArray(),
        };

        if (description) {
            data.description = description;
        }
        if (exampleLines.length > 0) {
            data.example = exampleLines;
        }
        if (tags.length > 0) {
            data.tags = tags;
        }

        return data;
    };

    const getTypes: () => Promise<DocEntryData[]> = async () => {
        return new Promise((resolve) => {
            let entries: DocEntryData[] = [];

            for (const t of type) {
                const html = container.renderToString(DocEntry, {
                    props: {
                        data: t,
                    },
                });

                html.then((htmlContent) => {
                    const docData = getDocData(htmlContent);
                    entries.push(docData);
                    if (entries.length === type.length) {
                        resolve(entries);
                    }
                });
            }
        });
    };

    // Allow all origins
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", "application/json");

    return new Response(
        JSON.stringify(await getTypes()),
        {
            headers: headers,
            status: 200,
            statusText: "ohhi!",
        },
    );
}
