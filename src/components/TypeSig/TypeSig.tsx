import type { FC } from "preact/compat";
import TypeLink from "./TypeLink";
import TypeTypeArguments from "./TypeTypeArguments";

type Props = {
    data: any;
};

const TypeSig: FC<Props> = ({ data }) => {
    const keyword = data?.kind;

    return (
        <>
            {(() => {
                switch (keyword) {
                    case "NumberKeyword":
                        return <span>number</span>;
                    case "StringKeyword":
                        return <span>string</span>;
                    case "BooleanKeyword":
                        return <span>boolean</span>;
                    case "ArrayType":
                        return (
                            <span>
                                <TypeLink
                                    href={`#${data.elementType.typeName}`}
                                    styled
                                    data={data}
                                >
                                    {data.elementType.typeName}
                                </TypeLink>
                                []
                            </span>
                        );
                    case "AnyKeyword":
                        return <span>any</span>;
                    case "NullKeyword":
                        return <span>null</span>;
                    case "UndefinedKeyword":
                        return <span>undefined</span>;
                    case "VoidKeyword":
                        return <span>void</span>;
                    case "NeverKeyword":
                        return <span>never</span>;
                    case "TypeReference":
                        return (
                            <span>
                                <TypeLink
                                    href={`#${data.typeName}`}
                                    styled
                                    data={data}
                                >
                                    <>{data.typeName}</>
                                </TypeLink>
                            </span>
                        );
                    case "StringLiteral":
                        return `"${data.text}"`;
                    case "LiteralType":
                        return <TypeSig data={data.literal} />;
                    case "TypeParameter":
                        return <span>{data.name}</span>;
                    case "ParenthesizedType":
                        return (
                            <>
                                (<TypeSig data={data.type} />)
                            </>
                        );
                    case "UnionType":
                        return data.types.map((t: any, i: number) => (
                            <>
                                <TypeSig data={t} />

                                {i === data.types.length - 1 ? "" : " | "}
                            </>
                        ));
                    case "FunctionType":
                        return (
                            <span>
                                (
                                {data.parameters.map((p: any, i: number) => (
                                    <>
                                        {p.name}
                                        {i === data.parameters.length - 1
                                            ? ""
                                            : ", "}
                                    </>
                                ))}
                                ){" =>"} <TypeSig data={data.type} />
                            </span>
                        );
                    case "TypeLiteral":
                        return (
                            <>
                                {Object.entries(data.members).map(
                                    ([name, variants]: [string, any]) =>
                                        variants.map((mem: any) => (
                                            <div>
                                                {name}: <TypeSig data={mem} />
                                            </div>
                                        )),
                                )}
                            </>
                        );
                    default:
                        return <span>{keyword}</span>;
                }
            })()}
            <TypeTypeArguments data={data} />
        </>
    );
};

export default TypeSig;
