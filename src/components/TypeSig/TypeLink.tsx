import { cn } from "@/util/cn";
import type { FC, PropsWithChildren } from "preact/compat";

const TypeLink: FC<PropsWithChildren<{
    href?: string;
    styled?: boolean;
}>> = ({ children, href = "", styled = false}) => {
    return <a
        href={href}
        className={cn({
            "decoration-current underline decoration-dashed": styled,
        })}
    >
        {children}
    </a>;
}

export default TypeLink;