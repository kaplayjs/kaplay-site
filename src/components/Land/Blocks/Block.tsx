import { component$ } from "@builder.io/qwik";
import { Code } from "../../Util/Code.tsx";

type BlockProps = {
    title: string;
    code: string;
};

export const Block = component$<BlockProps>((props) => {
    return (
        <section class="flex-1 overflow-auto rounded-box bg-base-300 p-4">
            <h3 class="text-md font-semibold">{props.title}</h3>

            <Code content={props.code} language="typescript" />
        </section>
    );
});
