import { FC, memo } from "react";

import { Formula } from "@/api/adr";
import { useQueryStore } from "@/lib/store";
import { createNestedObject } from "@/lib/utils";
import _ from "lodash";
import { OperandDropArea } from "./drop-area/operand-drop-area";
import { OperationDropArea } from "./drop-area/operation-drop-area";
import { OperandTypes } from "./operand-types";

export interface FormulaRenderProps {
    formula: Formula,
    index: number,
    parents: string[],
    groupIndex?: number[],
}

export const FormulaRender: FC<FormulaRenderProps> = memo(function QueryBox({
    formula, index, parents, groupIndex
}) {
    const { query, addToQueryFormula, addToQueryFormulaInGrouping, addToQueryFormulaInSubGrouping } = useQueryStore();

    function getParentFormula(): Formula | undefined {
        if (groupIndex?.length == 1) {
            return query.query?.queries![index].group![groupIndex[0]].formula;
        } else if (groupIndex?.length == 2) {
            return query.query?.queries![index].group![groupIndex[0]].group![groupIndex[1]].formula;
        } else {
            return query.query?.queries![index].formula;
        }
    }

    const handleOperandDrop = (index: number, item: any, operandLocation: string, parents: string[], groupIndex: number[] | undefined) => {
        const parentFormula = getParentFormula();
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], item.criteria)), groupIndex[0], groupIndex[1]);
                    }
                    break;
                case 'right':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], item.criteria)), groupIndex[0], groupIndex[1]);
                    }
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND_FORMULA], {})), groupIndex[0], groupIndex[1]);
                    }
                    break;
                case 'right':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, _.merge({},
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_VALUE], null),
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND_FORMULA], {})), groupIndex[0], groupIndex[1]);
                    }
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any, parents: string[], groupIndex: number[] | undefined) => {
        const parentFormula = getParentFormula();
        if (item.operation) {
            if (!groupIndex || groupIndex.length == 0) {
                addToQueryFormula(index, _.merge({},
                    parentFormula,
                    createNestedObject([...parents.slice(1), OperandTypes.OPERATION], item.operation)));
            } else if (groupIndex?.length == 1) {
                addToQueryFormulaInGrouping(index, _.merge({},
                    parentFormula,
                    createNestedObject([...parents.slice(1), OperandTypes.OPERATION], item.operation)), groupIndex[0]);
            } else if (groupIndex?.length == 2) {
                addToQueryFormulaInSubGrouping(index, _.merge({},
                    parentFormula,
                    createNestedObject([...parents.slice(1), OperandTypes.OPERATION], item.operation)), groupIndex[0], groupIndex[1]);
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
                groupIndex={groupIndex} />
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
            &#41;&nbsp;
        </>
    )
})