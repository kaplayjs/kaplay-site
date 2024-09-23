import doc from "@/../doc.json";
import { isCtxMember as isCtxMember } from "@/util/doc";
import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { DocEntry } from "./DocEntry";

export const DocPreview = component$(() => {
    const docEntries = useSignal<any[]>([]);
    const docLoaded = useSignal(false);

    useOnDocument(
        "onSetDocPreview",
        $((e: CustomEvent<number>) => {
            const allDoc = doc.types as any;
            const ctxDoc = allDoc.KaboomCtx?.[0].members
                ?? allDoc.KAPLAYCtx?.[0].members;
            const foundDoc = allDoc[e.detail] ?? ctxDoc[e.detail] ?? [];

            docEntries.value = foundDoc;
            docLoaded.value = true;
        }),
    );

    return (
        <dialog id="type-modal" class="modal">
            <div class="modal-box absolute right-4 lg:h-96 min-w-64 overflow-y-auto">
                {docLoaded.value && (
                    <div class="flex justify-end gap-2">
                        <a
                            id="open-in-new"
                            class="btn btn-ghost"
                            href={(isCtxMember(docEntries.value[0]?.name)
                                ? "/doc/ctx/"
                                : "/doc/") + docEntries.value[0]?.name}
                            target="_blank"
                        >
                            Open in new tab
                        </a>
                    </div>
                )}
                <div id="modal-type" class="h-full">
                    {docLoaded.value && (
                        <>
                            {docEntries.value.map((refData: any, i) => (
                                <DocEntry data={refData} key={i} />
                            ))}
                        </>
                    )}

                    {!docLoaded.value && (
                        <div class="flex items-center justify-center h-full">
                            <span class="loading loading-dots loading-lg text-primary" />
                        </div>
                    )}
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button class="cursor-default">close</button>
            </form>
        </dialog>
    );
});
