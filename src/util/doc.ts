import doc from "@/../doc.json";

export const isKaboomCtxMember = (item: string) => {
    const kaboomDoc = doc.types.KaboomCtx[0].members as any;
    return Object.keys(kaboomDoc).includes(item);
};
