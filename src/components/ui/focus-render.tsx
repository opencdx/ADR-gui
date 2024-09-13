import { Focus } from "@/api/adr";
import { FC } from "react";

export interface FocusRenderProps {
    focus: Focus | undefined
}

export const FocusRender: FC<FocusRenderProps> = ({ focus }) => {
    switch (focus) {
        case Focus.Ancestors:
            return <>Ancestors</>;
        case Focus.AncestorsOrSelf:
            return <>Ancestors or Self</>;
        case Focus.Children:
            return <>Child</>;
        case Focus.ChildrenOrSelf:
            return <>Child or Self</>;
        case Focus.Date:
            return <>Date</>;
        case Focus.Descendants:
            return <>Descendants</>;
        case Focus.DescendantsOrSelf:
            return <>Descendants or Self</>;
        case Focus.Member:
            return <>Member</>;
        case Focus.Parent:
            return <>Parent</>;
        case Focus.ParentOrSelf:
            return <>Parent or Self</>;
        case Focus.Self:
            return <>Self</>;
    }

    return <></>;
};