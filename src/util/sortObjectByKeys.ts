export function sortObjectByKeys<T extends object>(
    obj: T,
    keysOrder: string[],
): T {
    return Object.fromEntries(
        Object.entries(obj).sort(([a], [b]) => {
            const ia = keysOrder.indexOf(a);
            const ib = keysOrder.indexOf(b);

            const pa = ia === -1 ? Infinity : ia;
            const pb = ib === -1 ? Infinity : ib;

            return pa - pb;
        }),
    ) as T;
}
