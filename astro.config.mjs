import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import qwik from "@qwikdev/astro";
import {
    transformerNotationDiff,
    transformerNotationWordHighlight,
} from "@shikijs/transformers";
import astroMetaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { defineConfig, passthroughImageService } from "astro/config";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
    site: "https://kaplayjs.com",
    integrations: [
        qwik(),
        mdx(),
        tailwind(),
        astroMetaTags(),
        robotsTxt(),
        sitemap(),
    ],
    experimental: {
        contentLayer: true,
    },
    srcDir: "src",
    server: {
        port: 3200,
    },
    image: {
        service: passthroughImageService(),
    },
    markdown: {
        shikiConfig: {
            transformers: [
                transformerNotationDiff(),
                transformerNotationWordHighlight(),
            ],
        },
        remarkPlugins: [
            remarkMath,
        ],
    },
});
