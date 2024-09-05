import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { OperandDropArea } from "./operand-drop-area";
import { OperationDropArea } from "./operation-drop-area";
import { OperandTypes } from "./operand-types";

export interface FormulaRenderProps {
    formula: Formula,
    index: number,
    parents: string[],
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parents
}) {
    const { removeFromQuery, addOperandCriteria, addOperationToFormula, addOperandValue,
        addOperandToFormula, addOperandCriteriaToFormula, addOperandValueToFormula, addFormulaToFormula
    } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string, parents: string[]) => {
        if (parents.length == 1 && item.criteria && parents[0] == OperandTypes.FORMULA) {
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
        } else if (parents.length == 2 && item.criteria && (parents[1] == OperandTypes.LEFT_OPERAND_FORMULA || parents[1] == OperandTypes.RIGHT_OPERAND_FORMULA)) {
            if (parents[1] == OperandTypes.LEFT_OPERAND_FORMULA) {
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
            } else if (parents[1] == OperandTypes.RIGHT_OPERAND_FORMULA) {
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
        } else if (parents.length == 1 && item.formula && parents[0] == OperandTypes.FORMULA) {
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
        } else if (parents.length == 2 && item.formula && (parents[1] == OperandTypes.LEFT_OPERAND_FORMULA || parents[1] == OperandTypes.RIGHT_OPERAND_FORMULA)) {
            if (parents[1] == OperandTypes.LEFT_OPERAND_FORMULA) {
                switch (operandLocation) {
                    case 'left':
                        addFormulaToFormula(index, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND_FORMULA);
                        break;
                    case 'right':
                        addFormulaToFormula(index, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND_FORMULA);
                        break;
                }
            } else if (parents[1] == OperandTypes.RIGHT_OPERAND_FORMULA) {
                switch (operandLocation) {
                    case 'left':
                        addFormulaToFormula(index, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND_FORMULA);
                        break;
                    case 'right':
                        addFormulaToFormula(index, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND_FORMULA);
                        break;
                }
            }
        }
    }

    const handleOperationDrop = (index: number, item: any, parents: string[]) => {
        if (parents.length == 1 && item.operation && parents[0] == OperandTypes.FORMULA) {
            addOperationToFormula(index, item.operation);
        } else if (parents.length == 2 && item.operation && parents[1] == OperandTypes.LEFT_OPERAND_FORMULA) {
            addOperandValueToFormula(index, item.operation, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.OPERATION);
        } else if (parents.length == 2 && item.operation && parents[1] == OperandTypes.RIGHT_OPERAND_FORMULA) {
            addOperandValueToFormula(index, item.operation, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.OPERATION);
        } else if (parents.length == 3 && item.operation && parents[2] == OperandTypes.LEFT_OPERAND_FORMULA) {
            addOperandValueToFormula(index, item.operation, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.OPERATION);
        } else if (parents.length == 3 && item.operation && parents[2] == OperandTypes.RIGHT_OPERAND_FORMULA) {
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
                onDrop={(item) => handleOperandDrop(index, item, 'left', parents)}
                formula={formula!}
                index={index}
                operandLocation='left'
                parents={parents} />
            <OperationDropArea onDrop={(item) => handleOperationDrop(index, item, parents)}
                formula={formula!}
                index={index} />
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'right', parents)}
                formula={formula!}
                index={index}
                operandLocation='right'
                parents={parents} />
            &#41;
        </>
    )
})