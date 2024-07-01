import { component$, Slot } from "@builder.io/qwik";

type SidebarFolderProps = {
    title: string;
    id: string;
    isOpen?: boolean;
};

export const SidebarFolder = component$((props: SidebarFolderProps) => {
    return (
        <div
            class="folder | flex flex-col"
            id={props.id}
            folder-state={props.isOpen ? "open" : "closed"}
        >
            <p
                class="folder-title | btn btn-ghost w-full btn-sm justify-start text-left text-lg"
                onCLick$={(e) => {
                    const folderTitle = e.target as HTMLElement;
                    const folder = folderTitle.parentElement;
                    const folderState = folder?.getAttribute("folder-state");

                    if (folderState === "open") {
                        folder?.setAttribute("folder-state", "closed");
                    } else {
                        folder?.setAttribute("folder-state", "open");
                    }
                }}
            >
                {props.title}
            </p>
            <ul class="folder-content | flex-col gap-2 mx-4 border-l-2 border-current">
                <Slot />
            </ul>
        </div>
    );
});
