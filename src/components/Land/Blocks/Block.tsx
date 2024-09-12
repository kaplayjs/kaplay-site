import { cn } from "@/util/cn.ts";
import { component$ } from "@builder.io/qwik";
import { Code } from "../../Util/Code.tsx";

type BlockProps = {
    title: string;
    code: string;
};

export const Block = component$<BlockProps>((props) => {
    return (
        <div
            class={cn("p-4 rounded-box | bg-base-300 w-full")}
        >
            <h3 class="text-md font-semibold">{props.title}</h3>

            <Code
                content={props.code}
                language="typescript"
            />
        </div>
    );
});
