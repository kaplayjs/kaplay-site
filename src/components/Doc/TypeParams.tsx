import { component$ } from "@builder.io/qwik";
import { TypeSig } from "./TypeSig";

type Props = {
    data?: any;
};

const getParams = (data: any) => {
    const paramsToCheck = "parameters";

    if (data?.[paramsToCheck] ?? data?.type?.[paramsToCheck]) {
        return data?.[paramsToCheck] ?? data?.type?.[paramsToCheck];
    }
};

export const optionalMark = (data: any) => {
    return data.questionToken ? "?" : "";
};

export const TypeParams = component$(({ data }: Props) => {
    const params = getParams(data);

    if (!params) {
        return null;
    }

    return (
        <span>
            {"("}
            {params.map((param: any, i: number) => (
                <>
                    {param.name}
                    {optionalMark(param)}: <TypeSig data={param.type} />
                    {i !== params.length - 1 && <>{", "}</>}
                </>
            ))}
            {")"}
        </span>
    );
});
