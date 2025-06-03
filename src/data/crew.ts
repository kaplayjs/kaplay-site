import { highlight } from "@/util/highlight";
import { assets, crewAssets, fontAssets } from "@kaplayjs/crew";

type Asset = (typeof assets)[keyof typeof assets];

export type CrewItem = Asset & {
    code: false | {
        original: string;
        outlined?: string;
    };
};

export interface Crew {
    [key: string]: CrewItem;
}

const crewCode = async (value: string): Promise<string> =>
    await highlight(`loadCrew("${value}");`);
const crewFontCode = async (value: string): Promise<string> =>
    await highlight(`loadCrewFont("${value}");`);

const crew: Crew = {};

for (const [key, value] of Object.entries(assets)) {
    const isCrew = crewAssets[key as keyof typeof crewAssets];
    const isFont = fontAssets[key as keyof typeof fontAssets];
    const getCode = isCrew ? crewCode : isFont ? crewFontCode : null;

    const code = getCode
        ? {
            original: await getCode(key),
            ...(value.outlined ? { outlined: await getCode(`${key}-o`) } : {}),
        }
        : false;

    crew[key] = {
        ...value,
        code,
    };
}

export { crew as assets };
export default crew;
