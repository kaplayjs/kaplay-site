import { component$, Slot } from "@builder.io/qwik";

type Props = {
    data?: any;
    parentData?: any;
};

export const Type = component$(() => {
    return (
        <span class="text-primary">
            <Slot />
        </span>
    );
});

export const TypeSig = component$(({ data, parentData }: Props) => {
    const keyword = data.kind;

    switch (keyword) {
        case "NumberKeyword":
            return <Type>number</Type>;
        case "StringKeyword":
            return <Type>string</Type>;
        case "BooleanKeyword":
            return <span class="text-primary">boolean</span>;
        case "AnyKeyword":
            return <span class="text-primary">any</span>;
        case "NullKeyword":
            return <span class="text-primary">null</span>;
        case "UndefinedKeyword":
            return <span class="text-primary">undefined</span>;
        case "VoidKeyword":
            return <span class="text-primary">void</span>;
        case "NeverKeyword":
            return <span class="text-primary">never</span>;
        case "StringLiteral":
            return <span class="text-primary">{data.text}</span>;
        case "TypeParameter":
            return <span class="text-primary">{data.name}</span>;
        case "TypeReference":
            return (
                <span class="text-primary">
                </span>
            );
        case "LiteralType":
        case "ParenthesizedType":
        case "UnionType":
        case "FunctionType":
        case "TypeLiteral":
        case "ArrayType":
        case "IntersectionType":
        case "IndexedAccessType":
        default:
            return <span>{keyword}</span>;
    }
});
