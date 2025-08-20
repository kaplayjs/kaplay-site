import doc from "../doc.json";
import compMapJson from "../src/data/comps.json";

interface QueryResult {
    apiEntry: string;
    from: "ctx" | "global";
    url: string;
    extras: string;
}

export const queryDoc = (query: string): QueryResult | null => {
    const globalDoc = (doc as any).types;
    const ctxDoc: any = globalDoc.KaboomCtx?.[0].members
        ?? globalDoc.KAPLAYCtx?.[0].members;
    let extras: string = "";

    query = query.replace(/\(.*?\)/g, match => {
        extras = match;
        return "";
    });

    if (query.includes(".")) {
        let [parentQuery, memberQuery] = query.split(".");

        // Support special names
        switch (parentQuery) {
            case "obj":
                parentQuery = "GameObjRaw";
                break;
            case "debug":
                parentQuery = "Debug";
                break;
        }

        // TODO: Support for multiple overloads
        const parentDocEntry = globalDoc[parentQuery]?.[0];

        if (!parentDocEntry || !parentDocEntry.members) return null;

        const memberDocEntry = parentDocEntry.members[memberQuery];
        if (!memberDocEntry && parentQuery !== "GameObjRaw") return null;

        if (!memberDocEntry && parentQuery === "GameObjRaw") {
            const comp = getComponentOfMember(memberQuery);

            if (!comp) return null;

            parentQuery = comp;
        }

        return {
            apiEntry: query,
            from: "global",
            url: `/docs/api/${parentQuery}#${parentQuery}-${memberQuery}`,
            extras: extras,
        };
    } else {
        const docEntry = globalDoc[query] ?? ctxDoc[query];
        const isCtx = Boolean(ctxDoc[query]);

        if (!docEntry) return null;

        return {
            apiEntry: query,
            from: isCtx ? "ctx" : "global",
            url: `/docs/api${isCtx ? `/ctx/` : "/"}${query}`,
            extras: extras,
        };
    }
};

export const getComponentOfMember = (maybeCompMember: string) => {
    const allComponents: string[] = Object.keys(compMapJson.compMap);
    const globalDoc = (doc as any).types;

    for (const comp of allComponents) {
        // TODO: Detect better the Type for every component name
        const compQuery = compMapJson.compMap[comp];

        if (globalDoc[compQuery]?.[0]?.members?.[maybeCompMember]) {
            return compQuery;
        }
    }
};
