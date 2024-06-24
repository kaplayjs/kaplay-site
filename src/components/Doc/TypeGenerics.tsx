import { component$ } from "@builder.io/qwik";
import { TypeSig } from "./TypeSig";

type Props = {
    data?: any;
};

export const TypeGenerics = component$(({ data }: Props) => {
    const typeParams = data?.typeArguments || data?.typeParameters;

    if (!typeParams) {
        return null;
    }

    return (
        <span>
            {"<"}
            {typeParams?.map((p: any, i: number) => (
                <>
                    <TypeSig data={p} />
                    {i === typeParams.length - 1 ? "" : ", "}
                </>
            ))}
            {">"}
        </span>
    );
});
