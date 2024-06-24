import type { Locale } from "@/util/i18n";
import { getLangedRoute } from "@/util/path";
import { component$, Slot, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

type SidebarLinkProps = {
    link: string;
    target?: string;
    lang?: Locale;
    noTranslate?: boolean;
};

export const SidebarLink = component$((props: SidebarLinkProps) => {
    const lang = props.lang || "en";

    useTask$(() => {
        if (isServer) {
            return; // Server guard
        }

        const setUrl = () => {
            const url = new URL(location.href);
            const pathname = url.pathname;
            const sidebar = document.querySelector<HTMLElement>(".drawer-side");
            const links = document.querySelectorAll<HTMLElement>(
                ".sidebar-link-a",
            );

            links.forEach((link) => {
                const href = link.dataset.link;
                link.classList.remove("btn-primary");
                link.classList.add("btn-ghost");

                if (href === pathname) {
                    link.classList.remove("btn-ghost");
                    link.classList.add("btn-primary");
                    link.dataset.curScroll = sidebar?.scrollTop.toString();

                    if (sidebar) {
                        sidebar.scrollTop = link.offsetTop
                            - sidebar.clientHeight / 2;
                    }
                }
            });
        };

        document.addEventListener("astro:after-swap", () => setUrl());
        document.addEventListener("DOMContentLoaded", () => setUrl());
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
