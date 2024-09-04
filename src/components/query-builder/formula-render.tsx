import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula, Query } from "@/api/adr";
import { OperandDropArea } from "./operand-drop-area";
import { OperationDropArea } from "./operation-drop-area";

export interface FormulaRenderProps {
    formula: Formula,
    index: number,
    parent: string,
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parent
}) {
    const { removeFromQuery, addLeftOperandCriteria, addRightOperandCriteria, addOperationToFormula, addLeftOperandValue, addRightOperandValue,
        addLeftOperandFormula, addRightOperandFormula
    } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string) => {
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    addLeftOperandValue(index, null);
                    addLeftOperandCriteria(index, item.criteria);
                    break;
                case 'right':
                    addRightOperandValue(index, null);
                    addRightOperandCriteria(index, item.criteria);
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    addLeftOperandValue(index, null);
                    addLeftOperandFormula(index);
                    break;
                case 'right':
                    addRightOperandValue(index, null);
                    addRightOperandFormula(index);
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any) => {
        if (item.operation) {
            addOperationToFormula(index, item.operation);
        }
    }

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    return (
        <>
            &#40;
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'left')}
                formula={formula!}
                index={index}
                operandLocation='left'
                parent={parent} />
            <OperationDropArea onDrop={(item) => handleOperationDrop(index, item)}
                formula={formula!}
                index={index} />
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'right')}
                formula={formula!}
                index={index}
                operandLocation='right'
                parent={parent} />
            &#41;
        </>
    )
})