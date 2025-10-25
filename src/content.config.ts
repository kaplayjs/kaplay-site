import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const genericSchema = z.object({
    title: z.string(),
    description: z.string(),
    language: z.optional(z.string()),
});

const guideCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./content/guides/",
        generateId(options) {
            const [language, category, folder, nameWithExtension] = options
                .entry.split("/");
            const name = options.data["url"] as string
                ?? nameWithExtension.replace(/\.(md|mdx)$/, "");

            options.data["language"] = language;
            options.data["category"] = category;
            options.data["folder"] = folder;

            return name;
        },
    }),
    type: "content_layer",
    schema: ({ image }) =>
        z.intersection(
            genericSchema,
            z.object({
                image: z.optional(image()),
                url: z.optional(z.string()),
                category: z.optional(z.string()),
                folder: z.optional(z.string()),
                version: z.optional(z.string()),
                order: z.optional(z.string()),
                hidden: z.optional(z.boolean()),
                ads: z.optional(z.boolean()).default(true),
            }),
        ),
});

const blogCollection = defineCollection({
    type: "content", // v2.5.0 and later
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
    type: "content", // v2.5.0 and later
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
            const entries: any[] = [];

            for (const typeKey of Object.keys(allTypes)) {
                const type = allTypes[typeKey];
                const folder = Object.entries(groups).find(
                    ([_, group]: any) => {
                        if (group.entries.includes(typeKey)) {
                            return true;
                        }

                        return false;
                    },
                );

                const entryData = {
                    id: typeKey,
                    title: "placeholder",
                    description: "placeholder",
                    entry: type,
                    folder: folder?.[0] || "Ungrouped",
                };

                entries.push(entryData);
            }

            return entries;
        },
    }),
    schema: z.intersection(
        genericSchema,
        z.object({
            folder: z.string(),
            entry: z.any(),
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
