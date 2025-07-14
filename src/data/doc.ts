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

for (const key of Object.keys(docs.types)) {
    const ogs = docs.types[key];
    const replacements = docsReplacement[key];

    if (replacements) {
        for (let i = 0; i < replacements.length; i++) {
            const replacement = replacements[i];
            const og = ogs[i];

            for (const replacementKey of Object.keys(replacement)) {
                if (replacementKey == "members") {
                    const replacementMembers = replacement["members"];
                    const originalMembers = og["members"];

                    for (
                        const replacementMemberKey of Object.keys(
                            replacementMembers,
                        )
                    ) {
                        const originalMember =
                            originalMembers[replacementMemberKey];
                        const replacementMember =
                            replacementMembers[replacementMemberKey];

                        originalMembers[replacementMemberKey] = Object.values(
                            deepMerge(
                                originalMember,
                                replacementMember,
                            ),
                        );

                        console.log(originalMembers[replacementMemberKey]);
                    }
                }
            }
        }
    }
}

export const doc = generatedDocs as any;
