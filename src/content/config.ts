import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        image: z.optional(z.string()),
        date: z.string(),
        hidde: z.optional(z.boolean()),
    }),
});

const guideCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
        image: z.optional(z.string()),
        category: z.optional(z.string()),
    }),
});

const booksCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        chapter: z.number(),
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
