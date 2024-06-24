import { component$ } from "@builder.io/qwik";

type Props = {
    data?: any;
    parent?: string;
};

// sets link for members/parents
export const TypeName = component$(({ data, parent }: Props) => {
    const parentText = parent ? `${parent}-` : "";

    return (
        <span class="font-medium">
            <a href={`#${parentText}${data.name}`}>{data.name}</a>
        </span>
    );
});
