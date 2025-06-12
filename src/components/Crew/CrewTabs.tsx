import { assets, crewPacks, typeOptions } from "@/data/crew";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { CrewListItem } from "./CrewListItem";
import { CrewListPack } from "./CrewListPack";
import { CrewTabsTriggers } from "./CrewTabsTriggers";

type CrewTabsProps = {
    items: (keyof typeof assets)[];
    setCurCrewItem: (item: keyof typeof assets) => void;
    maximized: boolean;
    dialogRef: preact.RefObject<HTMLDialogElement>;
};

export const CrewTabs = (
    { items, setCurCrewItem, maximized, dialogRef }: CrewTabsProps,
) => {
    const [typeFilter, setTypeFilter] = useState<typeOptions>("All");
    const tabsScrollTop = useRef<Record<typeOptions, number> | {}>({});
    const tabsRef = useRef<HTMLDivElement>(null);

    const crewItems = useMemo(
        () =>
            items.filter(asset =>
                typeFilter === "All"
                    ? true
                    : assets[asset].type === typeFilter
            ),
        [items, typeFilter],
    );

    const crewItemsPacked = useMemo(
        () =>
            crewPacks.reduce((obj, pack) => {
                obj[pack] = crewItems.filter(
                    item => (assets[item].pack || "Other") == pack,
                );
                return obj;
            }, {} as Record<typeof crewPacks[number], typeof crewItems>),
        [crewItems],
    );

    const tabTriggers = useMemo(
        () =>
            Object.fromEntries(
                typeOptions.map(type => [
                    type,
                    type === "All"
                        ? items.length
                        : items.filter(asset => assets[asset].type == type)
                            .length,
                ]),
            ) as Record<typeOptions, number>,
        [items],
    );

    const handleTypeChange = (type: typeOptions) => {
        tabsScrollTop.current[typeFilter] = tabsRef.current?.scrollTop ?? 0;

        setTypeFilter(type);
    };

    useEffect(() => {
        if (!tabsRef.current) return;

        const scrollTop = tabsScrollTop.current[typeFilter] ?? 0;
        tabsRef.current.scrollTop = scrollTop;
    }, [typeFilter]);

    return (
        <>
            <CrewTabsTriggers
                tabs={tabTriggers}
                active={typeFilter}
                onChange={handleTypeChange}
                data-maximized={maximized || undefined}
            />

            <div class="flex flex-col flex-1 bg-base-100/60 min-h-0 rounded-b-xl group-data-[minimized]:rounded-tr-lg">
                <div
                    class="flex-1 px-4 lg:px-8 pb-4 lg:pb-8 overflow-y-auto !scroll-auto scrollbar-thin focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-base-content/10 rounded-[inherit]"
                    ref={tabsRef}
                >
                    {Object.entries(crewItemsPacked).map((
                        [pack, crewItems],
                    ) => (
                        <CrewListPack
                            key={pack}
                            pack={pack as typeof crewPacks[number]}
                            count={crewItems.length}
                        >
                            {crewItems.map((
                                crewItem: keyof typeof assets,
                                i,
                            ) => (
                                <a
                                    class="max-[459px]:grow max-[459px]:basis-1/3 focus:outline-none focus-visible:ring-2 focus-visible:ring-base-content rounded-xl"
                                    key={i}
                                    href={`/crew/${crewItem}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        setCurCrewItem(crewItem);
                                        dialogRef.current?.showModal();
                                    }}
                                >
                                    <CrewListItem crewItem={crewItem} />
                                </a>
                            ))}
                        </CrewListPack>
                    ))}
                </div>
            </div>
        </>
    );
};
