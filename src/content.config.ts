import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const genericSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    language: z.optional(z.string()),
    category: z.optional(z.string()),
    group: z.optional(z.string()),
});

const guideCollection = defineCollection({
    type: "content_layer",
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./content/guides/",
        generateId(options) {
            const [language, category, folder, nameWithExtension] = options
                .entry.split("/");
            const name = options.data["url"] as string
                ?? nameWithExtension.replace(/\.(md|mdx)$/, "");

            // NEW
            options.data["language"] = language;
            options.data["category"] = category;
            options.data["group"] = folder;
            options.data["url"] = `/docs/guides/${name}`;

            return name;
        },
    }),
    schema: ({ image }) =>
        z.intersection(
            genericSchema,
            z.object({
                image: z.optional(image()),
                url: z.optional(z.string()),
                version: z.optional(z.string()),
                order: z.optional(z.string()),
                hidden: z.optional(z.boolean()),
                ads: z.optional(z.boolean()).default(true),
            }),
        ),
});

const blogCollection = defineCollection({
    type: "content_layer",
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./content/blog/",
        generateId(options) {
            const nameWithExtension = options.entry;
            const name = options.data["url"] as string
                ?? nameWithExtension.replace(/\.(md|mdx)$/, "");

            options.data["category"] = "blog";
            options.data["group"] = "Blog";
            options.data["url"] = `/blog/${name}`;

            return name;
        },
    }),
    schema: z.intersection(
        genericSchema,
        z.object({
            author: z.string(),
            image: z.optional(z.string()),
            date: z.string(),
            hidden: z.optional(z.boolean()),
            version: z.optional(z.string()),
            imageFocus: z.tuple([z.string(), z.string()]).optional().nullable(),
            crewBadge: z.object({
                crew: z.string(),
                text: z.string(),
                textColor: z.string().optional(),
                bgColor: z.string().optional(),
                borderColor: z.string().optional(),
            }).optional(),
        }),
    ),
});

const booksCollection = defineCollection({
    type: "content_layer",
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./content/books/",
        generateId(options) {
            const nameWithExtension = options.entry;
            const name = options.data["url"] as string
                ?? nameWithExtension.replace(/\.(md|mdx)$/, "");

            options.data["category"] = "How to be a Bean Wizard";
            options.data["group"] = "Chapter 1";

            return name;
        },
    }),
    schema: z.intersection(
        genericSchema,
        z.object({
            title: z.string(),
            description: z.string(),
            chapter: z.number(),
            version: z.optional(z.string()),
        }),
    ),
});

const miscCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.intersection(
        genericSchema,
        z.object({
            title: z.string(),
            description: z.string(),
        }),
    ),
});

const apiDocsCollection = defineCollection({
    type: "content_layer",
    loader: file("./doc.json", {
        parser(text) {
            const docJson = JSON.parse(text);
            const groups = docJson.groups;
            const allTypes = docJson.types;
            const ctxTypes = allTypes.KaboomCtx?.[0].members
                ?? allTypes.KAPLAYCtx?.[0].members;
            const entries: any[] = [];

            for (const typeKey of Object.keys(allTypes)) {
                const type = allTypes[typeKey];
                const group = Object.entries(groups).find(
                    ([_, group]: any) => {
                        if (group.entries.includes(typeKey)) {
                            return true;
                        }

                        return false;
                    },
                );

                const entryData = {
                    id: typeKey,
                    originalId: typeKey,
                    title: typeKey,
                    description: "placeholder",
                    type: type,
                    group: group?.[0] || "Miscalenous",
                    category: "apiDocs",
                    isCtx: false,
                    url: `/docs/api/${typeKey}`,
                };

                entries.push(entryData);
            }

            for (const typeKey of Object.keys(ctxTypes)) {
                const type = ctxTypes[typeKey];
                const group = Object.entries(groups).find(
                    ([_, group]: any) => {
                        if (group.entries.includes(typeKey)) {
                            return true;
                        }

                        return false;
                    },
                );

                const entryData = {
                    id: `ctx-${typeKey}`,
                    originalId: typeKey,
                    title: typeKey,
                    description: "placeholder",
                    type: type,
                    group: group?.[0] || "Ungrouped",
                    category: "apiDocs",
                    isCtx: true,
                    url: `/docs/api/ctx/${typeKey}`,
                };

                entries.push(entryData);
            }

            return entries;
        },
    }),
    schema: z.intersection(
        genericSchema,
        z.object({
            type: z.any(),
            originalId: z.string(),
            isCtx: z.boolean(),
        }),
    ),
});

export const collections = {
    blog: blogCollection,
    guides: guideCollection,
    books: booksCollection,
    misc: miscCollection,
    apiDocs: apiDocsCollection,
};
