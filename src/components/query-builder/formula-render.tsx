import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { OperandDropArea } from "./operand-drop-area";
import { OperationDropArea } from "./operation-drop-area";
import { OperandTypes } from "./operand-types";
import { createNestedObject } from "@/lib/utils";
import _ from "lodash";

export interface FormulaRenderProps {
    formula: Formula,
    index: number,
    parents: string[]
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parents
}) {
    const { query, addOperationToFormula, addOperandValueToFormula, addToFormulaThirdDepth, addToQueryFormula
    } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string, parents: string[]) => {
        const parentFormula = query.query?.queries![index].formula;
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    addToQueryFormula(index, _.merge({}, 
                        parentFormula,
                        createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                        createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)));
                    break;
                case 'right':
                    addToQueryFormula(index, _.merge({}, 
                        parentFormula,
                        createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                        createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)));
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    addToQueryFormula(index, _.merge({}, 
                        parentFormula,
                        createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                        createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})));
                    break;
                case 'right':
                    addToQueryFormula(index, _.merge({}, 
                        parentFormula,
                        createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                        createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})));
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any, parents: string[]) => {
        if (parents.length == 1 && item.operation && parents[0] == OperandTypes.FORMULA) {
            addOperationToFormula(index, item.operation);
        } else if (parents.length == 2 && item.operation) {
            addOperandValueToFormula(index, item.operation, parents[1], OperandTypes.OPERATION);
        } else if (parents.length == 3 && item.operation) {
            addToFormulaThirdDepth(index, item.operation, parents[1], parents[2], OperandTypes.OPERATION);
        }
    }

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