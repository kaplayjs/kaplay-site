import doc from "@/../doc.json";

export const isCtxMember = (item: string) => {
    const allDoc = doc.types as any;
    const ctx = allDoc.KaboomCtx?.[0].members
        ?? (allDoc["KAPLAYCtx"]?.[0].members as any);
    return Object.keys(ctx).includes(item);
};
