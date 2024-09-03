import { FC, memo } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";

export interface AddQueryDropAreaProps {
    onDrop: (item: any) => void
    criteria?: string
}

export const AddQueryDropArea: FC<AddQueryDropAreaProps> = memo(function AddQueryBox({
    onDrop,
}) {
    const { removeFromQuery } = useQueryStore();
    const query = useQueryStore((state) => state.query);

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    const handleDrop = (index: number, item: any) => {
        
    }

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.CRITERIA, DroppableTypes.JOIN_OPERATION, DroppableTypes.FORMULA],
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
    )

    const opacity = isOver ? 0.7 : 1
    let backgroundColor = '#fff'
    let color = '#6E6E6E'
    let border = '1px dashed gray'
    if (draggingColor && canDrop) {
        backgroundColor = '#CCE3FD'
        color = '#0066FF'
        border = '1px solid #66AAF9'
    }

    return (
        <div
            ref={drop}
            className='flex rounded-md h-14 w-auto px-4 py-2 items-center mb-2'
            style={{ backgroundColor, color, border, opacity }}
            role="AddQueryBox"
        >
            {isActive ? 'Release to add' : 'Drag criteria and or operators here in the Query Field and begin defining'}
        </div>
    )
})