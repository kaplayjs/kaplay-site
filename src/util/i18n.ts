export type Locale = typeof locales[number];

export const locales = ["es", "en"] as const;

export const localesData = {
    es: {
        name: "Español",
        url: "/es/",
    },
    en: {
        name: "English",
        url: "/",
    },
};
