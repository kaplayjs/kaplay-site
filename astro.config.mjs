import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    srcDir: "src",
    redirects: {
        "/": "/guides/setup",
        "/guides": "/guides/setup",
    },
    image: {
        service: passthroughImageService(),
    },
});
