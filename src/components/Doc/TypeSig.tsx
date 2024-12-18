import { component$, Slot } from "@builder.io/qwik";
import { DocEntry } from "./DocEntry";
import { TypeLink } from "./TypeLink";
import { TypeParams } from "./TypeParams";

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
    const keyword = data?.kind;

    switch (keyword) {
        case "NumberKeyword":
            return <Type>number</Type>;
        case "StringKeyword":
            return <Type>string</Type>;
        case "BooleanKeyword":
            return <Type>boolean</Type>;
        case "AnyKeyword":
            return <Type>any</Type>;
        case "NullKeyword":
            return <Type>null</Type>;
        case "UnknownKeyword":
            return <Type>unknown</Type>;
        case "ThisType":
            return <Type>this</Type>;
        case "UndefinedKeyword":
            return <Type>undefined</Type>;
        case "VoidKeyword":
            return <Type>void</Type>;
        case "NeverKeyword":
            return <Type>never</Type>;
        case "StringLiteral":
            return <Type>{data.text}</Type>;
        case "TypeParameter":
            return <Type>{data.name}</Type>;
        case "TypeReference":
            return (
                <Type>
                    <TypeLink name={data.typeName}></TypeLink>
                </Type>
            );
        case "LiteralType":
            return <TypeSig data={data.literal} />;
        case "ParenthesizedType":
            return <TypeSig data={data.type} />;
        case "UnionType":
            return (
                <>
                    {data?.types?.map((type: any, i: number) => (
                        <>
                            <TypeSig data={type} />
                            {i === data.types.length - 1 ? "" : " | "}
                        </>
                    ))}
                </>
            );
        case "FunctionType":
            return (
                <span>
                    <TypeParams data={data} />
                    {"=>"}
                    <TypeSig data={data.type} />
                </span>
            );
        case "TypeLiteral":
            return (
                <>
                    {Object.entries(data.members)?.map(
                        ([, variants]: [string, any]) =>
                            variants?.map((mem: any, i: number) => (
                                <DocEntry
                                    data={mem}
                                    parent={`${parentData?.name}`}
                                    key={`${parentData?.name}-${i}`}
                                />
                            )),
                    )}
                </>
            );
        case "ArrayType":
            return (
                <>
                    <TypeSig data={data.elementType} />
                    []
                </>
            );

        case "IntersectionType":
            return (
                <>
                    {data.types?.map((type: any, i: number) => (
                        <span>
                            <TypeSig data={type} />
                            {i === data.types.length - 1 ? "" : " & "}
                        </span>
                    ))}
                </>
            );
        case "IndexedAccessType":
            return (
                <>
                    <TypeSig data={data.objectType} />[
                    <TypeSig data={data.indexType} />]
                </>
            );
        case "TypeQuery":
            return <TypeLink name={data.exprName?.escapedText}></TypeLink>;
        case "TupleType":
            return (
                <>
                    [
                    {data.elements?.map((type: any, i: number) => (
                        <>
                            <TypeSig data={type} />
                            {i === data.elements.length - 1 ? "" : ", "}
                        </>
                    ))}
                    ]
                </>
            );
        default:
            return (
                <>
                    {keyword ? <span class="text-warning">{keyword}</span> : ""}
                </>
            );
    }
});
