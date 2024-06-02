import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroMetaTags from "astro-meta-tags";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://kaplayjs.com",
    integrations: [
        tailwind(),
        mdx(),
        astroMetaTags(),
        robotsTxt(),
        sitemap(),
    ],
    compressHTML: false,
    srcDir: "src",
    server: {
        port: 3200,
    },
    image: {
        service: passthroughImageService(),
    },
});
