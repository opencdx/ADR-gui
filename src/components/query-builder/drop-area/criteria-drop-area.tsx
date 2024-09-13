import { FC, memo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Formula, Query } from "@/api/adr";
import { FocusRender } from "@/components/ui/focus-render";
import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from '../../droppable/droppable-types';

export interface CriteriaDropAreaProps {
    query?: Query
    formula?: Formula,
    index: number,
    operandLocation?: string,
    parents?: string[],
    groupIndex?: number,
}

export const CriteriaDropArea: FC<CriteriaDropAreaProps> = memo(function QueryBox({
    query, formula, index, operandLocation, parents, groupIndex
}) {
    const { removeFromQuery, addFocusToQuery } = useQueryStore();
    const [hovered, setHovered] = useState(false);

    const handleHoverEnter = () => {
        setHovered(true);
    };

    const handleHoverLeave = () => {
        setHovered(false);
    };

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.FOCUS],
            item: { },
            drop(item: any, monitor) {
                if (query) {
                    addFocusToQuery(index, item.focus);
                }
                if (formula) {
                    switch (operandLocation) {
                        case 'left':
                            break;
                        case 'right':
                            break;
                    }
                    if (typeof groupIndex === 'number') {
                    }
                }
                return undefined;
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                isActive: monitor.canDrop() && monitor.isOver(),
                draggingColor: monitor.getItemType() as string,
            }),
        })
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
                    {formula.leftOperand && (
                        <div className='text-[#001124]'><FocusRender focus={formula.leftOperand.focus} /> [{formula.leftOperand.conceptName}] </div>
                    )}
                    {formula.rightOperand && (
                        <div className='text-[#001124]'><FocusRender focus={formula.rightOperand.focus} /> [{formula.rightOperand.conceptName}] </div>
                    )}
                </>
            )}
        </div>
    )
})