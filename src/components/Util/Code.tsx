import { highlight } from "@/util/highlight";
import { useEffect, useState } from "preact/hooks";

type Props = { content: string; language: string; copyBtn?: boolean };

export const Code = (props: Props) => {
    const [highlighted, setHighlighted] = useState<string>("");

    useEffect(() => {
        if (!props.content) return;

        highlight(
            props.content,
            props.language,
            props.copyBtn,
        ).then((html) => {
            setHighlighted(html);
        });
    }, [props]);

    return (
        props.content && (
            <div dangerouslySetInnerHTML={{ __html: highlighted }}>
                <pre class="shiki github-dark bg-base-200 text-base-content/50">
                    <code>{props.content}</code>
                </pre>
            </div>
        )
    );
};
