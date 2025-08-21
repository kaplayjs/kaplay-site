import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";
import cloudflareRedirects from "astro-cloudflare-redirects";
import astroMetaTags from "astro-meta-tags";
import pagefind from "astro-pagefind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import kaplayPackageJson from "./kaplay/package.json";
import websitePackageJson from "./package.json";
import { rehypeKAPLAY } from "./plugins/rehypeKAPLAY";

// https://astro.build/config
export default defineConfig({
    site: "https://kaplayjs.com",
    vite: {
        define: {
            __KAPLAY_VERSION__: JSON.stringify(kaplayPackageJson.version),
            __KAPLAY_MAJORMINOR__: JSON.stringify(
                kaplayPackageJson.version.replace(/(\d+\.\d+).*/, "$1"),
            ),
            __KAPLAY_MAJOR__: JSON.stringify(
                kaplayPackageJson.version.replace(/(\d+).*/, "$1"),
            ),
            __SITE_VERSION__: JSON.stringify(
                websitePackageJson.version,
            ),
        },
        plugins: [
            {
                buildStart() {
                    console.log(
                        "Building KAPLAY website for ",
                        kaplayPackageJson.version,
                    );
                },
            },
        ],
    },
    integrations: [
        mdx(),
        tailwind(),
        astroMetaTags(),
        robotsTxt(),
        sitemap(),
        pagefind(),
        preact(),
        cloudflareRedirects(),
    ],
    output: "static",
    contentLayer: true,
    srcDir: "src",
    server: {
        port: 3200,
    },
    i18n: {
        locales: ["es", "en"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
    markdown: {
        gfm: true,
        shikiConfig: {
            transformers: [
                transformerNotationDiff(),
                transformerNotationHighlight(),
                transformerNotationWordHighlight(),
            ],
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, {
                behavior: "wrap",
                properties: { className: ["heading-anchor-link"] },
            }],
            [rehypeKatex, {}],
            [rehypeKAPLAY, {}],
        ],
    },
});
