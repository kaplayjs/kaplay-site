import { cn } from "@/util/cn";
import type { FC, PropsWithChildren } from "preact/compat";
import { useStore } from "@nanostores/preact";
import { openExample } from "@/stores/docStore";

type Props = PropsWithChildren<{
    href?: string;
    styled?: boolean;
    data?: any;
}>;

const TypeLink: FC<Props> = ({ children, data, href = "", styled = false }) => {
    const $openExample = useStore(openExample);

    const handleClick = () => {
        openExample.set(data);

        const typeModal =
            document.querySelector<HTMLDialogElement>("#type_modal");

        typeModal?.showModal();
    };

    return (
        <button
            className={cn("cursor-pointer", {
                "decoration-current underline decoration-dashed": styled,
            })}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default TypeLink;
