import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
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
});

const guideCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./content/guides/",
    }),
    type: "content_layer",
    schema: ({ image }) =>
        z.object({
            url: z.optional(z.string()),
            title: z.string(),
            description: z.string(),
            image: z.optional(image()),
            category: z.optional(z.string()),
            version: z.optional(z.string()),
            order: z.optional(z.string()),
            hidden: z.optional(z.boolean()),
            noAds: z.optional(z.boolean()),
        }),
});

const booksCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        chapter: z.number(),
        version: z.optional(z.string()),
    }),
});

const miscCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
});

export const collections = {
    blog: blogCollection,
    guides: guideCollection,
    books: booksCollection,
    misc: miscCollection,
};
