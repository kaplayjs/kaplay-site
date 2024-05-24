import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), mdx()],
    srcDir: "src",
    server: {
        port: 3200,
    },
    image: {
        service: passthroughImageService(),
    },
});
