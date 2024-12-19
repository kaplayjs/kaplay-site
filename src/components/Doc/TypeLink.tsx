import { doc } from "@/data/doc";
import { cn } from "@/util/cn";
import { $, component$ } from "@builder.io/qwik";

type Props = {
    name: string;
};

export const TypeLink = component$(({ name }: Props) => {
    const ctxMember = doc.types.KaboomCtx?.[0].members[name]
        ?? doc.types.KAPLAYCtx?.[0].members[name];
    const typesMember = doc.types[name];

    const isType = Boolean(typesMember) || Boolean(ctxMember);
    const isCtxMember = Boolean(ctxMember);
    const isTypesMember = Boolean(typesMember);

    const handleClick = $((e: PointerEvent) => {
        const target = e.target as HTMLElement;
        const linkType = target.dataset.linkType;
        const typeModal = document.querySelector<HTMLDialogElement>(
            "#type-modal",
        );

        if (linkType) {
            document.dispatchEvent(
                new CustomEvent("onSetDocPreview", { detail: linkType }),
            );
        }

        if (typeModal) {
            typeModal.showModal();
        }
    });

    return (
        <span
            class={"type-btn hoverable text-primary"}
            data-link-type={`${isTypesMember ? "/" : "/ctx/"}${name}`}
            data-is-type={String(isType)}
            onClick$={handleClick}
        >
            {name}
        </span>
    );
});
