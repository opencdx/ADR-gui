import { FC, memo } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../../droppable/droppable-types'
import type { DragItem } from '../interfaces'
import { Formula } from "@/api/adr";

export interface UnitsDropAreaProps {
    onDrop: (item: any) => void
    formula: Formula,
    index: number,
    operandLocation: string,
    parents: string[],
}

export const UnitsDropArea: FC<UnitsDropAreaProps> = memo(function QueryBox({
    onDrop, formula, index, operandLocation, parents
}) {

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.UNITS],
            drop(_item: DragItem, monitor) {
                onDrop(monitor.getItem());
                return undefined;
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                isActive: monitor.canDrop() && monitor.isOver(),
                draggingColor: monitor.getItemType() as string,
            }),
        }),
        [onDrop],
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
        <div ref={drop} className='text-[#001124]'>
            {formula && formula.leftOperandUnit && operandLocation == 'left' &&
                <div className='p-0.5'>({formula.leftOperandUnit.conceptName})</div>
            }
            {!formula?.leftOperandUnit && operandLocation == 'left' &&
                <div className='h-[30px] border-dashed text-[#001124] text-center p-px'
                style={{ border: '1px dashed gray', backgroundColor, color, opacity }}>units</div>
            }
            {formula && formula.rightOperandUnit && operandLocation == 'right' &&
                <div className='p-0.5'>({formula.rightOperandUnit.conceptName})</div>
            }
            {!formula?.rightOperandUnit && operandLocation == 'right' &&
                <div className='h-[30px] border-dashed text-[#001124] text-center p-px'
                style={{ border: '1px dashed gray', backgroundColor, color, opacity }}>units</div>
            }
        </div>
    )
})