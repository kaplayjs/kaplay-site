import doc from "@/../doc.json";
import { isKaboomCtxMember } from "@/util/doc";
import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { DocEntry } from "./DocEntry";

export const DocPreview = component$(() => {
    const docEntries = useSignal<any[]>([]);

    useOnDocument(
        "onSetDocPreview",
        $((e: CustomEvent<number>) => {
            const allDoc = doc.types as any;
            const kaboomDoc = allDoc.KaboomCtx[0].members as any;
            const foundDoc = allDoc[e.detail] ?? kaboomDoc[e.detail] ?? [];

            docEntries.value = foundDoc;
        }),
    );

    return (
        <dialog id="type-modal" class="modal">
            <div class="modal-box absolute right-4 lg:h-96 overflow-y-auto w-fit">
                <div class="flex justify-end gap-2">
                    <a
                        id="open-in-new"
                        class="btn btn-ghost"
                        href={(isKaboomCtxMember(docEntries.value[0]?.name)
                            ? "/doc/ctx/"
                            : "/doc/") + docEntries.value[0]?.name}
                        target="_blank"
                    >
                        Open in new tab
                    </a>
                </div>
                <div id="modal-type">
                    <>
                        {docEntries.value.map((refData: any, i) => (
                            <DocEntry data={refData} key={i} />
                        ))}
                    </>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button class="cursor-default">close</button>
            </form>
        </dialog>
    );
});
