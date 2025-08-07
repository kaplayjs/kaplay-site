import doc from "@/../doc.json";

export async function GET({ params, request }) {
    const allDoc: any = doc.types;
    const allDocKeys: string[] = Object.keys(allDoc).filter(
        (k) => k !== "KAPLAYCtx" && k !== "KaboomCtx" && k !== "undefined",
    );
    const kaboomDoc: any = allDoc.KaboomCtx?.[0].members
        ?? allDoc.KAPLAYCtx?.[0].members;
    const allKaboomDocKeys: string[] = Object.keys(kaboomDoc).map((k) => {
        return `ctx.${k}`;
    });

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", "application/json");

    return new Response(
        JSON.stringify([...allDocKeys, ...allKaboomDocKeys]),
        {
            status: 200,
            headers: headers,
            statusText: "OK",
        },
    );
}
