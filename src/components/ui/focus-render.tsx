import { Focus } from "@/api/adr";
import { FC } from "react";

export interface FocusRenderProps {
    focus: Focus | undefined
}

export const FocusRender: FC<FocusRenderProps> = ({ focus }) => {
    switch (focus) {
        case Focus.Ancestors:
            return <>Ancestors&nbsp;</>;
        case Focus.AncestorsOrSelf:
            return <>Ancestors or Self&nbsp;</>;
        case Focus.Children:
            return <>Child&nbsp;</>;
        case Focus.ChildrenOrSelf:
            return <>Child or Self&nbsp;</>;
        case Focus.Date:
            return <>Date&nbsp;</>;
        case Focus.Descendants:
            return <>Descendants&nbsp;</>;
        case Focus.DescendantsOrSelf:
            return <>Descendants or Self&nbsp;</>;
        case Focus.Member:
            return <>Member&nbsp;</>;
        case Focus.Parent:
            return <>Parent&nbsp;</>;
        case Focus.ParentOrSelf:
            return <>Parent or Self&nbsp;</>;
        case Focus.Self:
            return <></>;
    }

    return <></>;
};