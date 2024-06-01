import type { FC } from "preact/compat";
import TypeSig from "./TypeSig";

type Props = {
    data: any;
};

// render type arguments/parameters for a type (Type<T>)
const TypeTypeArguments: FC<Props> = ({ data }) => {
    const typeParams = data?.typeArguments || data?.typeParameters;

    return (
        <>
            {typeParams && (
                <span>
                    {"<"}
                    {typeParams.map((p: any, i: number) => (
                        <TypeSig data={p} />
                    ))}
                    {">"}
                </span>
            )}
        </>
    );
};

export default TypeTypeArguments;
