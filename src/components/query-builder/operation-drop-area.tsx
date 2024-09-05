import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { OperationRender } from "../ui/operation-render";

export interface OperationDropAreaProps {
    onDrop: (item: any) => void
    formula: Formula,
    index: number,
}

export const OperationDropArea: FC<OperationDropAreaProps> = memo(function QueryBox({
    onDrop, formula, index
}) {
    const { addOperationDoubleToQuery, addOperationStringToQuery } = useQueryStore();
    const [operationValue, setOperationValue] = useState('');
    const [hovered, setHovered] = useState(false);
    const [operationValuewidth, setOperationValuewidth] = useState('3ch');

    const valueUpdated = useMemo(() => {
        if (operationValue.length) {
            setOperationValuewidth((operationValue.length + 1) + 'ch');
            if (operationValue && !isNaN(Number(operationValue))) {
                addOperationDoubleToQuery(index, Number(operationValue));
            } else if (operationValue) {
                addOperationStringToQuery(index, operationValue);
            }
        }
    }, [operationValue]);

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.OPERATOR],
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
        <div ref={drop}>
            {formula && formula.operation &&
                <OperationRender operation={formula.operation}/>
            }
            {!formula?.operation &&
                <div className='h-[30px] border-dashed text-[#001124] text-center p-px'
                style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }}/>
            }
        </div>
    )
})