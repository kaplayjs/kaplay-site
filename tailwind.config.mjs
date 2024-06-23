/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    /** @type {import('daisyui').Config} */
    daisyui: {
        themes: [
            {
                kaplay: {
                    ...require("daisyui/src/theming/themes")["dim"],
                    primary: "#7fc963",
                    "--animation-btn": 0,
                },
                kaplayLight: {
                    ...require("daisyui/src/theming/themes")["emerald"],
                    "--animation-btn": 0,
                },
            },
        ],
        darkTheme: "kaplay",
        logs: false,
    },
};
