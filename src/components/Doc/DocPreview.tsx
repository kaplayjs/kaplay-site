import doc from "@/../doc.json";
import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { DocEntry } from "./DocEntry";

export const DocPreview = component$((props) => {
    const docEntries = useSignal([]);

    useOnDocument(
        "onSetDocPreview",
        $((e: CustomEvent<number>) => {
            console.log("docsetted");
            const allDoc = doc.types as any;
            const foundDoc = allDoc[e.detail];

            docEntries.value = foundDoc;

            console.log(foundDoc);
        }),
    );

    return (
        <dialog id="type-modal" class="modal">
            <div class="modal-box absolute right-4 lg:h-96 overflow-y-auto w-fit">
                <div class="flex justify-end gap-2">
                    <a id="go-to" class="btn btn-ghost" href="">Go To</a>
                    <a
                        id="open-in-new"
                        class="btn btn-ghost"
                        href=""
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
