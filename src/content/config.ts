import { defineCollection, z } from "astro:content";

const guideCollection = defineCollection({
    type: "content", // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number(),
    }),
});

export const collections = {
    "guides": guideCollection,
};
