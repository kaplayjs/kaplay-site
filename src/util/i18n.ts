import { englishLocales } from "@/locales/en";

export type Locale = typeof locales[number];
export type LocaleMap = {
    [K in keyof typeof englishLocales]: {
        [K2 in keyof typeof englishLocales[K]]: string;
    };
};
export type LocaleKeys = keyof LocaleMap;
export type LocaleSubKeys = {
    [K in LocaleKeys]: keyof LocaleMap[K];
};

// Automate this
export type TranslationStringsSidebar = `sidebar.${LocaleSubKeys["sidebar"]}`;
export type TranslationString = TranslationStringsSidebar;

export const locales = ["en", "es"] as const;
export const DEFAULT_LANG = "en";

export const localesNames = ["en", "es"] as const;

export const localesMap = {
    en: englishLocales,
    es: null,
};

function splitLocaleKey(key: TranslationString) {
    return key.split(".") as [
        keyof LocaleMap,
        keyof LocaleMap[keyof LocaleMap],
    ];
}

export function t(locale: Locale, key: TranslationString) {
    const keys = splitLocaleKey(key);
    const localKey = keys[0];
    const localSubKey = keys[1];
    const localeMap = localesMap[locale];
    const defaultLocaleMap = localesMap[locales[0]];

    localeMap?.[localKey]?.[localSubKey]
        ?? defaultLocaleMap[localKey][localSubKey];
}

export function localedT(locale: Locale) {
    return (tString: TranslationString) => t(locale, tString);
}
