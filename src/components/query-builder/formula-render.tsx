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
    parents: string[],
    groupIndex?: number,
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parents, groupIndex
}) {
    const { query, addToQueryFormula, addToQueryFormulaInGrouping } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string, parents: string[], groupIndex: number | undefined) => {
        let parentFormula;
        if (typeof groupIndex === 'number') {
            parentFormula = query.query?.queries![index].group![groupIndex].formula;
        } else {
            parentFormula = query.query?.queries![index].formula;
        }
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    if (typeof groupIndex === 'number') {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)), groupIndex);
                    } else {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)));
                    }
                    break;
                case 'right':
                    if (typeof groupIndex === 'number') {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)), groupIndex);
                    } else {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)));
                    }
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    if (typeof groupIndex === 'number') {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})), groupIndex);
                    } else {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})));
                    }
                    break;
                case 'right':
                    if (typeof groupIndex === 'number') {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})), groupIndex);
                    } else {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})));
                    }
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any, parents: string[], groupIndex: number | undefined) => {
        let parentFormula;
        if (typeof groupIndex === 'number') {
            parentFormula = query.query?.queries![index].group![groupIndex].formula;
        } else {
            parentFormula = query.query?.queries![index].formula;
        }
        if (item.operation) {
            if (typeof groupIndex === 'number') {
                addToQueryFormulaInGrouping(index, _.merge({},
                    parentFormula,
                    createNestedObject([...parents.slice(1), OperandTypes.OPERATION], item.operation)), groupIndex);
            } else {
                addToQueryFormula(index, _.merge({},
                    parentFormula,
                    createNestedObject([...parents.slice(1), OperandTypes.OPERATION], item.operation)));
            }
        }
    }

    return (
        <>
            &#40;
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'left', parents, groupIndex)}
                formula={formula!}
                index={index}
                operandLocation='left'
                parents={parents}
                groupIndex={groupIndex}/>
            <OperationDropArea onDrop={(item) => handleOperationDrop(index, item, parents, groupIndex)}
                formula={formula!}
                index={index} />
            <OperandDropArea
                onDrop={(item) => handleOperandDrop(index, item, 'right', parents, groupIndex)}
                formula={formula!}
                index={index}
                operandLocation='right'
                parents={parents}
                groupIndex={groupIndex} />
            &#41;
        </>
    )
})