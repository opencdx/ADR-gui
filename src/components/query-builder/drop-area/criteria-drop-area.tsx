import { FC, memo } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Formula, Query } from "@/api/adr";
import { FocusRender } from "@/components/ui/focus-render";
import { useQueryStore } from "@/lib/store";
import { createNestedObject, mergeWithEmptyObj, successToast } from "@/lib/utils";
import _ from "lodash";
import { DeleteIcon, Link, Tooltip } from 'ui-library';
import { DroppableTypes } from '../../droppable/droppable-types';
import { OperandTypes } from "../operand-types";

export interface CriteriaDropAreaProps {
    onDrop: (item: any) => void
    query?: Query
    formula?: Formula,
    operandLocation?: string,
    index?: number,
    depth?: number,
    groupIndex?: number[],
    parents?: string[],
}

export const CriteriaDropArea: FC<CriteriaDropAreaProps> = memo(function QueryBox({
    onDrop, query, formula, operandLocation, index, depth, groupIndex, parents
}) {

    const { query: queryStore, updateCriteriaByIndex, updateCriteriaByGrouping, updateCriteriaBySubGrouping, addToQueryFormula, addToQueryFormulaInGrouping, addToQueryFormulaInSubGrouping } = useQueryStore();

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.FOCUS, DroppableTypes.CRITERIA],
            item: {},
            drop(item: any, monitor) {
                onDrop(monitor.getItem());
                return undefined;
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                isActive: monitor.canDrop() && monitor.isOver(),
                draggingColor: monitor.getItemType() as string,
            }),
        }), [onDrop],
    );

    function getParentFormula(): Formula | undefined {
        if (typeof index === 'number') {
            if (groupIndex?.length == 1) {
                return queryStore.query?.queries![index].group![groupIndex[0]].formula;
            } else if (groupIndex?.length == 2) {
                return queryStore.query?.queries![index].group![groupIndex[0]].group![groupIndex[1]].formula;
            } else {
                return queryStore.query?.queries![index].formula;
            }
        }
    }

    const clearCriteria = (query: Query | undefined, formula: Formula | undefined, index: number | undefined, depth: number | undefined, groupIndex: number[] | undefined, operandLocation: string | undefined, parents: string[] | undefined) => {
        if (query) {
            if (groupIndex?.length == 0 && typeof depth === 'number' && typeof index === 'number') {
                updateCriteriaByGrouping(index, depth, {});
            } else if (groupIndex?.length === 1 && typeof depth === 'number' && typeof index === 'number') {
                updateCriteriaBySubGrouping(index, groupIndex[0], depth, {});
            } else if (typeof index === 'number') {
                updateCriteriaByIndex(index, {});
            }
        } else if (formula && parents && typeof index === 'number') {
            const parentFormula = _.cloneDeep(getParentFormula());
            switch (operandLocation) {
                case 'left':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], {})));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], {})), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.LEFT_OPERAND], {})), groupIndex[0], groupIndex[1]);
                    }
                    break;
                case 'right':
                    if (!groupIndex || groupIndex.length == 0) {
                        addToQueryFormula(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], {})));
                    } else if (groupIndex?.length == 1) {
                        addToQueryFormulaInGrouping(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], {})), groupIndex[0]);
                    } else if (groupIndex?.length == 2) {
                        addToQueryFormulaInSubGrouping(index, mergeWithEmptyObj(
                            parentFormula,
                            createNestedObject([...parents.slice(1), OperandTypes.RIGHT_OPERAND], {})), groupIndex[0], groupIndex[1]);
                    }
                    break;
            }
        }

        successToast("Criteria Deleted");
    }

    const opacity = isOver ? 0.7 : 1;
    let backgroundColor = '#fff';
    let color = '#6E6E6E';
    let border = '1px solid #757575';
    if (draggingColor && canDrop) {
        backgroundColor = '#CCE3FD';
        color = '#0066FF';
        border = '1px dashed #66AAF9';
    }

    return (
        <Tooltip
            placement='top-end'
            radius='sm'
            isDisabled={(query && query.concept && !query.concept.conceptName) || (formula && formula.leftOperand && !formula.leftOperand.conceptName && operandLocation == 'left') || (formula && formula.rightOperand && !formula.rightOperand.conceptName && operandLocation == 'right')}
            content={
                <Link color='foreground' className='p-2 cursor-pointer' onPress={() => clearCriteria(query, formula, index, depth, groupIndex, operandLocation, parents)}>
                    <div className='text-[#006FEE] flex'><DeleteIcon /></div>
                    Delete Criteria
                </Link>
            }
        >
            <div ref={drop} className='text-[#001124] hover:text-[#006FEE]'>
                {query && query.concept && (
                    <div><FocusRender focus={query.concept.focus} /> {query.concept.conceptName && (<>[{query.concept.conceptName}]</>)} {!query.concept.conceptName && <div className='text-[#A1A1AA]'>[ Drag criteria here ]</div>} </div>
                )}
                {formula && (
                    <>
                        {formula.leftOperand && operandLocation == 'left' && (
                            <div><FocusRender focus={formula.leftOperand.focus} /> {formula.leftOperand.conceptName && (<>[{formula.leftOperand.conceptName}]</>)} {!formula.leftOperand.conceptName && <div className='text-[#A1A1AA]'>[ Drag criteria here ]</div>} </div>
                        )}
                        {formula.rightOperand && operandLocation == 'right' && (
                            <div><FocusRender focus={formula.rightOperand.focus} /> {formula.rightOperand.conceptName && (<>[{formula.rightOperand.conceptName}]</>)} {!formula.rightOperand.conceptName && <div className='text-[#A1A1AA]'>[ Drag criteria here ]</div>} </div>
                        )}
                    </>
                )}
            </div>
        </Tooltip>
    )
})