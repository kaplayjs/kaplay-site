export type Locale = "en" | "es";
export type LocaleMap = {
    [K in keyof typeof englishLocales]: {
        [K2 in keyof typeof englishLocales[K]]: string;
    };
};
export type LocaleKeys = keyof LocaleMap;
export type LocaleSubKeys = {
    [K in LocaleKeys]: keyof LocaleMap[K];
};
export type TranslationStringsHome = `home.${LocaleSubKeys["home"]}`;
export type TranslationStringsSidebar = `sidebar.${LocaleSubKeys["sidebar"]}`;
export type TranslationStringsProjects =
    `projects.${LocaleSubKeys["projects"]}`;
export type TranslationString =
    | TranslationStringsHome
    | TranslationStringsSidebar
    | TranslationStringsProjects;

export const englishLocales = {
    "home": {
        "role": "Full Stack Web Developer",
        "istudied":
            "I studied Fullstack web development at the Technology University of Buenos Aires.",
        "iworked":
            "I've worked in different projects, from chat bot implementations for services to game engines, being maintener of KAPLAY.",
    },
    "sidebar": {
        "description": "the online space",
    },
    "projects": {
        "title": "Projects",
    },
} as const;

export const spanishLocales = {
    "home": {
        "role": "Desarrollador Web Full Stack",
        "istudied":
            "Estudié desarrollo web Fullstack en la Universidad Tecnológica de Buenos Aires.",
        "iworked":
            "He trabajado en diferentes proyectos, desde implementaciones de chat bot para servicios hasta motores de juegos, siendo encargado de KAPLAY.",
    },
    "sidebar": {
        "description": "the online space",
    },
    "projects": {
        "title": "Proyectos",
    },
} as const;

export const localesNames = ["en", "es"] as const;

export const localesMap = {
    en: englishLocales,
    es: spanishLocales,
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

    return localeMap[localKey][localSubKey];
}

export function localedT(locale: Locale) {
    return (tString: TranslationString) => t(locale, tString);
}
