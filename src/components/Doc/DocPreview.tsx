import { $, component$, useOnDocument } from "@builder.io/qwik";

export const DocPreview = component$(() => {
    useOnDocument(
        "onSetDocPreview",
        $(async (e: CustomEvent<number>) => {
            const modalType = document.getElementById("modal-type");
            if (!modalType) return;
            const openInNew = document.getElementById("open-in-new");
            if (!openInNew) return;
            openInNew.setAttribute("href", "");

            modalType.innerHTML = `<div class="loading loading-dots"></div>`;

            // get html of the page
            const page = await fetch(`/api/doc${e.detail}`);

            const html = await page.text();
            const parser = new DOMParser();
            const typeDom = parser.parseFromString(html, "text/html");
            const type = typeDom.querySelector("article");
            if (!type) return;

            modalType.innerHTML = "";
            modalType.appendChild(type);
            openInNew.setAttribute("href", `/doc${e.detail}`);
        }),
    );

    return (
        <dialog id="type-modal" class="modal">
            <div class="modal-box absolute right-4 lg:h-96 min-w-64 overflow-y-auto">
                <div class="flex justify-end gap-2">
                    <a
                        id="open-in-new"
                        class="btn btn-ghost"
                        target="_blank"
                    >
                        Open in new tab
                    </a>
                </div>

                <div id="modal-type" class="h-full">
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button class="cursor-default">close</button>
            </form>
        </dialog>
    );
});
