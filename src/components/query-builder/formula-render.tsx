import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { OperandDropArea } from "./operand-drop-area";
import { OperationDropArea } from "./operation-drop-area";
import { OperandTypes } from "./operand-types";

export interface FormulaRenderProps {
    formula: Formula,
    index: number,
    parent: string,
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parent
}) {
    const { removeFromQuery, addOperandCriteria, addOperationToFormula, addOperandValue,
        addOperandToFormula, addOperandCriteriaToFormula, addOperandValueToFormula
    } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string, parent: string) => {
        if (item.criteria && parent == OperandTypes.FORMULA) {
            switch (operandLocation) {
                case 'left':
                    addOperandValue(index, null, OperandTypes.LEFT_OPERAND_VALUE);
                    addOperandCriteria(index, item.criteria, OperandTypes.LEFT_OPERAND);
                    break;
                case 'right':
                    addOperandValue(index, null, OperandTypes.RIGHT_OPERAND_VALUE);
                    addOperandCriteria(index, item.criteria, OperandTypes.RIGHT_OPERAND);
                    break;
            }
        } else if (item.criteria && (parent == OperandTypes.LEFT_OPERAND_FORMULA || parent == OperandTypes.RIGHT_OPERAND_FORMULA)) {
            if (parent == OperandTypes.LEFT_OPERAND_FORMULA) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValue(index, null, OperandTypes.LEFT_OPERAND_VALUE);
                        addOperandCriteriaToFormula(index, item.criteria, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND);
                        break;
                    case 'right':
                        addOperandValue(index, null, OperandTypes.RIGHT_OPERAND_VALUE);
                        addOperandCriteriaToFormula(index, item.criteria, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND);
                        break;
                }
            } else if (parent == OperandTypes.RIGHT_OPERAND_FORMULA) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValue(index, null, OperandTypes.LEFT_OPERAND_VALUE);
                        addOperandCriteriaToFormula(index, item.criteria, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND);
                        break;
                    case 'right':
                        addOperandValue(index, null, OperandTypes.RIGHT_OPERAND_VALUE);
                        addOperandCriteriaToFormula(index, item.criteria, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND);
                        break;
                }
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    addOperandValue(index, null, OperandTypes.LEFT_OPERAND_VALUE);
                    addOperandToFormula(index, OperandTypes.LEFT_OPERAND_FORMULA);
                    break;
                case 'right':
                    addOperandValue(index, null, OperandTypes.RIGHT_OPERAND_VALUE);
                    addOperandToFormula(index, OperandTypes.RIGHT_OPERAND_FORMULA);
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any, parent: string) => {
        if (item.operation && parent == OperandTypes.FORMULA) {
            addOperationToFormula(index, item.operation);
        } else if (item.operation && parent == OperandTypes.LEFT_OPERAND_FORMULA) {
            addOperandValueToFormula(index, item.operation, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.OPERATION);
        } else if (item.operation && parent == OperandTypes.RIGHT_OPERAND_FORMULA) {
            addOperandValueToFormula(index, item.operation, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.OPERATION);
        }
    }

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    return (
        <>
            &#40;
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'left', parent)}
                formula={formula!}
                index={index}
                operandLocation='left'
                parent={parent} />
            <OperationDropArea onDrop={(item) => handleOperationDrop(index, item, parent)}
                formula={formula!}
                index={index} />
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'right', parent)}
                formula={formula!}
                index={index}
                operandLocation='right'
                parent={parent} />
            &#41;
        </>
    )
})