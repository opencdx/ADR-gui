import { FC, memo } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Formula, Query } from "@/api/adr";
import { FocusRender } from "@/components/ui/focus-render";
import { DroppableTypes } from '../../droppable/droppable-types';

export interface CriteriaDropAreaProps {
    onDrop: (item: any) => void
    query?: Query
    formula?: Formula,
    operandLocation?: string,
}

export const CriteriaDropArea: FC<CriteriaDropAreaProps> = memo(function QueryBox({
    onDrop, query, formula, operandLocation
}) {

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.FOCUS],
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
        <div ref={drop}>
            {query && query.concept && (
                <div className='text-[#001124]'><FocusRender focus={query.concept.focus} /> [{query.concept.conceptName}] </div>
            )}
            {formula && (
                <>
                    {formula.leftOperand && operandLocation == 'left' && (
                        <div className='text-[#001124]'><FocusRender focus={formula.leftOperand.focus} /> [{formula.leftOperand.conceptName}] </div>
                    )}
                    {formula.rightOperand && operandLocation == 'right' && (
                        <div className='text-[#001124]'><FocusRender focus={formula.rightOperand.focus} /> [{formula.rightOperand.conceptName}] </div>
                    )}
                </>
            )}
        </div>
    )
})