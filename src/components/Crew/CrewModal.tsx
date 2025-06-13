import type { assets } from "@/data/crew";
import { useEffect, useRef, useState } from "preact/hooks";
import { CrewItem } from "./CrewItem";

type CrewModalProps = {
    setOpenHandler: (fn: (item: keyof typeof assets) => void) => void;
};

export const CrewModal = ({ setOpenHandler }: CrewModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const [curCrewItem, setCurCrewItem] = useState<keyof typeof assets | null>(
        null,
    );

    const handleClose = () => dialogRef?.current?.close();

    useEffect(() => {
        setOpenHandler(() => (item: keyof typeof assets) => {
            setCurCrewItem(item);
            dialogRef?.current?.showModal();
        });
    }, [setOpenHandler]);

    return (
        <dialog
            ref={dialogRef}
            class="modal p-2 backdrop:opacity-0 bg-[#0a0c10]/60"
            id="crew-modal"
        >
            <div
                class="modal-box flex p-0 m-0 w-full max-w-[calc(64rem-4rem)] max-h-full focus:outline-none"
                tabIndex={0}
            >
                <button
                    class="btn absolute top-2 right-2 p-2 min-h-0 h-auto bg-base-50 border-0 rounded-xl z-10 hover:bg-base-content/30 transition-colors"
                    type="button"
                    onClick={handleClose}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <CrewItem crewItem={curCrewItem ?? undefined} isModal />
            </div>
            <form method="dialog" class="modal-backdrop">
                <button
                    type="button"
                    onClick={handleClose}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};
