export interface SidebarEntryCategory {
    name: string;
    groups: SidebarEntryGroup[];
}

export interface SidebarEntryGroup {
    name: string;
    entries: SidebarEntry[];
}

export interface SidebarEntry {
    name: string;
    url: string;
}
