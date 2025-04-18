import { component$, Slot } from "@builder.io/qwik";
import { assets } from "@kaplayjs/crew";

type SidebarLinkProps = {
    href: string;
    target?: string;
    reloadAll?: boolean;
    icon?: keyof typeof assets;
};

export const SidebarLink = component$((props: SidebarLinkProps) => {
    return (
        <li class="sidebar-link list-none">
            <a
                href={props.href}
                class="sidebar-link-a btn btn-sm h-auto w-full justify-start text-wrap text-left text-lg aria-[current=false]:btn-ghost aria-[current=page]:btn-primary"
                target={props.target}
                data-link={props.href}
                aria-current="false"
                data-astro-reload={props.reloadAll ? "all" : undefined}
            >
                {props.icon && (
                    <img
                        src={assets?.[props.icon].outlined}
                        alt="Home Icon"
                        class="h-6 w-6"
                    />
                )}
                <Slot />
            </a>
        </li>
    );
});
