import { defineCollection, z } from "astro:content";

const guideCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
        image: z.optional(z.string()),
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
    "guides": guideCollection,
    "misc": miscCollection,
};
