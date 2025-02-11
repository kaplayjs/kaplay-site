import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            screens: {
                "2sm": "380px",
            },
            fontFamily: {
                sans: ['"Outfit Variable"', ...defaultTheme.fontFamily.sans],
                hand: ['"Darumadrop One"', ...defaultTheme.fontFamily.sans]
            },
            dropShadow: {
                '2': [
                    "-2px 0 0 currentColor",
                    "2px 0 0 currentColor",
                    "0 -2px 0 currentColor",
                    "0 2px 0 currentColor",
                ]
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    /** @type {import('daisyui').Config} */
    daisyui: {
        themes: [
            {
                kaplay: {
                    ...require("daisyui/src/theming/themes")["dim"],
                    primary: "#abdd64",
                    "--animation-btn": 0,
                },
                kaplayLight: {
                    ...require("daisyui/src/theming/themes")["emerald"],
                    "--animation-btn": 0,
                },
                kaboom: {
                    primary: "#1e8ce6",
                    "primary-focus": "#570df8",
                    "primary-content": "#ffffff",
                    secondary: "#f000b8",
                    "secondary-focus": "#bd0091",
                    "secondary-content": "#ffffff",
                    accent: "#37cdbe",
                    "accent-focus": "#2ba69a",
                    "accent-content": "#ffffff",
                    neutral: "#2a2e37",
                    "neutral-focus": "#16181d",
                    "neutral-content": "#ffffff",
                    "base-100": "#4a3052",
                    "base-200": "#2c2c3e",
                    "base-300": "#20202e",
                    "base-content": "#ebecf0",
                    info: "#66c7ff",
                    success: "#87cf3a",
                    warning: "#e1d460",
                    error: "#ff6b6b",
                    "--rounded-box": "1rem",
                    "--rounded-btn": ".5rem",
                    "--rounded-badge": "1.9rem",
                    "--animation-btn": ".25s",
                    "--animation-input": ".2s",
                    "--btn-text-case": "uppercase",
                    "--navbar-padding": ".5rem",
                    "--border-btn": "1px",
                },
            },
        ],
        darkTheme: "kaplay",
        logs: false,
    },
};
