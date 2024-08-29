import { Operation } from "@/api/adr/model/query";
import { FC } from "react";

export interface OperationRenderProps {
    operation: Operation,
}

export const OperationRender: FC<OperationRenderProps> = ({ operation }) => {
    switch (operation) {
        case Operation.Equal:
            return <>&#61;&nbsp;</>;
        case Operation.GreaterThan:
            return <>&gt;&nbsp;</>;
        case Operation.GreaterThanOrEqual:
            return <>&gt;&#61;&nbsp;</>;
        case Operation.LessThan:
            return <>&#60;&nbsp;</>;
        case Operation.LessThanOrEqual:
            return <>&#60;&#61;&nbsp;</>;
        case Operation.NotEqual:
            return <>&#33;&#61;&nbsp;</>;
        default:
            return <></>;
    }
};