/** @type {import("prettier").Options} */
export default {
    printWidth: 80,
    tabWidth: 4,
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
        {
            files: "*.json",
            options: {
                tabWidth: 2,
            },
        },
    ],
};
