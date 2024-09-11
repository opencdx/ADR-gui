import { Operation as QueryOperation } from "@/api/adr/model/query";
import { Operation as FormulaOperation } from "@/api/adr/model/formula";
import { FC } from "react";

export interface OperationRenderProps {
    operation: any
}

export const OperationRender: FC<OperationRenderProps> = ({ operation }) => {
    switch (operation) {
        case QueryOperation.Equal:
            return <>&#61;&nbsp;</>;
        case QueryOperation.GreaterThan:
            return <>&gt;&nbsp;</>;
        case QueryOperation.GreaterThanOrEqual:
            return <>&gt;&#61;&nbsp;</>;
        case QueryOperation.LessThan:
            return <>&#60;&nbsp;</>;
        case QueryOperation.LessThanOrEqual:
            return <>&#60;&#61;&nbsp;</>;
        case QueryOperation.NotEqual:
            return <>&#33;&#61;&nbsp;</>;
    }

    switch (operation) {
        case FormulaOperation.Add:
            return <>&#43;</>
        case FormulaOperation.Divide:
            return <>&#47;</>
        case FormulaOperation.Multiply:
            return <>&#215;</>
        case FormulaOperation.Power:
            return <>&#94;</>
        case FormulaOperation.Subtract:
            return <>&#45;</>
    }
};