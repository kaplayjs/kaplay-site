import type { assets } from "@/data/crew";
import { useState } from "preact/hooks";
import { CrewList } from "./CrewList";
import { CrewModal } from "./CrewModal";

export const Crew = () => {
    const [modalOpenHandler, setModalOpenHandler] = useState<
        (item: keyof typeof assets) => void
    >(() => () => {});

    return (
        <>
            <CrewList openModal={modalOpenHandler}></CrewList>
            <CrewModal setOpenHandler={setModalOpenHandler} />
        </>
    );
};
