import { localedT, localesNames } from "./i18n";

export function getStaticPathsByLocales(locales = localesNames) {
    const defaultLocale = locales[0];

    return locales.map((locale, i) => {
        return {
            params: {
                path: locale === defaultLocale ? undefined : locale,
            },
            props: {
                t: localedT(locale),
                lang: locale,
            },
        };
    });
}
