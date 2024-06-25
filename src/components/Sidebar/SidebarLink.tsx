import type { Locale } from "@/util/i18n";
import { getLangedRoute } from "@/util/path";
import {
    component$,
    Slot,
    useSignal,
    useTask$,
    useVisibleTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

type SidebarLinkProps = {
    link: string;
    target?: string;
    lang?: Locale;
    noTranslate?: boolean;
};

export const SidebarLink = component$((props: SidebarLinkProps) => {
    const lang = props.lang || "en";
    const isCurrent = useSignal(false);

    useTask$(() => {
        if (isServer) {
            return; // Server guard
        }

        const url = new URL(location.href);
        const pathname = url.pathname;

        if (pathname === props.link) {
            isCurrent.value = true;
        }
    });

    return (
        <li class="sidebar-link list-none">
            <a
                href={props.noTranslate
                    ? props.link
                    : getLangedRoute(lang, props.link)}
                class="sidebar-link-a btn btn-ghost w-full btn-sm justify-start text-left text-lg"
                target={props.target}
                data-link={props.link}
            >
                <Slot />
            </a>
        </li>
    );
});
