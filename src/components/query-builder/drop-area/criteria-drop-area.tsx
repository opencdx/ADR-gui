import { FC, memo } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Formula, Query } from "@/api/adr";
import { DeleteIcon } from "@/components/icons";
import { FocusRender } from "@/components/ui/focus-render";
import { useQueryStore } from "@/lib/store";
import { Link, Tooltip } from "ui-library";
import { DroppableTypes } from '../../droppable/droppable-types';

export interface CriteriaDropAreaProps {
    onDrop: (item: any) => void
    query?: Query
    formula?: Formula,
    operandLocation?: string,
    index?: number,
    depth?: number,
    groupIndex?: number[]
}

export const CriteriaDropArea: FC<CriteriaDropAreaProps> = memo(function QueryBox({
    onDrop, query, formula, operandLocation, index, depth, groupIndex
}) {

    const { updateCriteriaByIndex, updateCriteriaByGrouping, updateCriteriaBySubGrouping } = useQueryStore();

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

    const clearCriteria = (index: number | undefined, depth: number | undefined, groupIndex: number[] | undefined) => {
        if (groupIndex?.length == 0 && typeof depth === 'number' && typeof index === 'number') {
            updateCriteriaByGrouping(index, depth, {});
        } else if (groupIndex?.length === 1 && typeof depth === 'number' && typeof index === 'number') {
            updateCriteriaBySubGrouping(index, groupIndex[0], depth, {});
        } else if (typeof index === 'number') {
            updateCriteriaByIndex(index, {});
        }
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
            isDisabled={!query?.concept?.conceptName}
            content={
                <Link color='foreground' className='p-2 cursor-pointer' onPress={() => clearCriteria(index, depth, groupIndex)}>
                    <div className='text-[#006FEE] flex'><DeleteIcon /></div>
                    Delete Criteria
                </Link>
            }
        >
            <div ref={drop} className='text-[#001124] hover:text-[#006FEE]'>
                {query && query.concept && (
                    <div><FocusRender focus={query.concept.focus} /> [{query.concept.conceptName && (<>{query.concept.conceptName}</>)} {!query.concept.conceptName && <>Drag criteria here </>}] </div>
                )}
                {formula && (
                    <>
                        {formula.leftOperand && operandLocation == 'left' && (
                            <div><FocusRender focus={formula.leftOperand.focus} /> [{formula.leftOperand.conceptName}] </div>
                        )}
                        {formula.rightOperand && operandLocation == 'right' && (
                            <div><FocusRender focus={formula.rightOperand.focus} /> [{formula.rightOperand.conceptName}] </div>
                        )}
                    </>
                )}
            </div>
        </Tooltip>
    )
})