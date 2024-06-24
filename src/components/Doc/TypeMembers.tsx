import { component$ } from "@builder.io/qwik";
import { DocEntry } from "./DocEntry";

type Props = {
    data?: any;
};

export const TypeMembers = component$(({ data }: Props) => {
    const members = data?.members;
    const parentName = data?.name;

    if (!members) return;

    return (
        <>
            {Object.keys(members).map((member: string) => {
                const membersData = members[member];

                return membersData.map((memberData: any, i: number) => {
                    return (
                        <DocEntry
                            data={memberData}
                            parent={`${parentName}`}
                            key={`${parentName}-${member}-${i}`}
                        />
                    );
                });
            })}
        </>
    );
});
