import docsReplacement from "../../custom.json";
import generatedDocs from "../../doc.json";

const docs = generatedDocs as any;

function deepMerge<T>(target: T, replacement: Partial<T>): T {
    const result = { ...target };

    for (const key in replacement) {
        const value = replacement[key];
        if (
            value !== null
            && typeof value === "object"
            && !Array.isArray(value)
            && typeof result[key] === "object"
        ) {
            result[key] = deepMerge(result[key], value);
        } else {
            // @ts-expect-error
            result[key] = value;
        }
    }

    return result;
}

for (const key of Object.keys(docsReplacement)) {
    const originalEntries = docs.types[key];
    const replacementEntries = docsReplacement[key] as any[];

    if (!originalEntries) continue;

    replacementEntries.forEach((replacement, i) => {
        originalEntries[i] = deepMerge(originalEntries[i], replacement);
    });
}

export const doc = generatedDocs as any;
