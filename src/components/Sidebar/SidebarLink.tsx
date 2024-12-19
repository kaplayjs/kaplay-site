import apiIcon from "@/../assets/api_icon.png";
import blogIcon from "@/../assets/blog_icon.png";
import controllerIcon from "@/../assets/controller_icon.png";
import discordIcon from "@/../assets/discord_icon.png";
import donateIcon from "@/../assets/donate_icon.png";
import githubIcon from "@/../assets/gh_icon.png";
import guidesIcon from "@/../assets/guides_icon.png";
import homeIcon from "@/../assets/home_icon.png";
import pogIcon from "@/../assets/pog_icon.png";
import { component$, Slot } from "@builder.io/qwik";

type SidebarLinkProps = {
    href: string;
    target?: string;
    reloadAll?: boolean;
    icon?: keyof typeof icons;
};

const icons = {
    home: homeIcon,
    github: githubIcon,
    discord: discordIcon,
    pog: pogIcon,
    donate: donateIcon,
    controller: controllerIcon,
    blog: blogIcon,
    guides: guidesIcon,
    api: apiIcon,
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
                        src={icons[props.icon].src}
                        alt="Home Icon"
                        class="h-6 w-6"
                    />
                )}
                <Slot />
            </a>
        </li>
    );
});
