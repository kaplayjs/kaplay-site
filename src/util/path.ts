import {
    DEFAULT_LANG,
    type Locale,
    localedT,
    locales as localesNames,
} from "./i18n";

export function getStaticPathsByLocales(locales = localesNames) {
    const defaultLocale = locales[0];

    return locales.map((locale) => {
        return {
            params: {
                path: locale === defaultLocale ? undefined : locale,
            },
            props: {
                t: localedT(locale as Locale),
                lang: locale as Locale,
            },
        };
    });
}

export const getLangFromPath = (path: string) => {
    const [, lang] = path.trim().split("/") as Locale[];

    if (localesNames.includes(lang)) {
        return lang ?? DEFAULT_LANG;
    }
    else {
        return DEFAULT_LANG;
    }
};

export const getPropsFromPath = (path: string) => {
    return getProps(getLangFromPath(path));
};

export const getProps = (locale: "es" | "en") => {
    return {
        t: localedT(locale),
        lang: locale,
    };
};

export const getLangedRoute = (locale: "es" | "en", route: string) => {
    return `/${locale === DEFAULT_LANG ? "." : locale}${route}`;
};
