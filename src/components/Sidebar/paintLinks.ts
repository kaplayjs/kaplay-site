// paint current link as green

const setUrl = () => {
    const pathname = new URL(location.href).pathname.replace(/\/$/, "");
    const sidebar = document.querySelector<HTMLElement>(".drawer-side");
    const links = document.querySelectorAll<HTMLElement>(".sidebar-link-a");

    links.forEach((link) => {
        const href = link.dataset.link?.replace(/\/$/, "");
        link.ariaCurrent = href === pathname ? "page" : "false";
    });
};

document.addEventListener("astro:after-swap", () => setUrl());
document.addEventListener("DOMContentLoaded", () => setUrl());
