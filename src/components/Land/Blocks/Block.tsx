import { component$ } from "@builder.io/qwik";
import { Code } from "../../Util/Code.tsx";

type BlockProps = {
    title: string;
    code: string;
};

export const Block = component$<BlockProps>((props) => {
    return (
        <section class="p-4 rounded-box flex-1 bg-base-300 overflow-auto">
            <h3 class="text-md font-semibold">{props.title}</h3>

            <Code
                content={props.code}
                language="typescript"
            />
        </section>
    );
});
