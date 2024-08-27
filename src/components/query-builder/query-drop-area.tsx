import { FC, memo, useCallback, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Query } from "@/api/adr";

export interface QueryDropAreaProps {
    onDrop: (item: any) => void
    query: Query,
    index: number
}

export const QueryDropArea: FC<QueryDropAreaProps> = memo(function QueryBox({
    onDrop, query, index
}) {
    const { removeFromQuery } = useQueryStore();

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.OPERATOR],
            drop(_item: DragItem, monitor) {
                onDrop(monitor.getItemType())
                return undefined
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

    const handleDrop = useCallback(
        (index: number, item: { name: any }) => {
            item;
        },
        [],
    );

    const opacity = isOver ? 0.7 : 1
    let backgroundColor = '#fff'
    let color = '#6E6E6E'
    if (draggingColor && canDrop) {
        backgroundColor = '#76B8DF'
        color = '#0066FF'
    }

    return (
        <div
            ref={drop}
            className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'
            style={{ backgroundColor, color, opacity }}
            key={index}
            onDrop={(item) => handleDrop(index, item)}>
            <div className='flex' ><span className="material-symbols-outlined" style={{ color: "#757575" }}>drag_indicator</span>
                <p style={{ color: "#001124" }}>{query.concept?.conceptName}</p>
            </div>
            <div><span onClick={() => handleRemove(index)} className="material-symbols-outlined" style={{ color: "#757575", cursor: "pointer" }}>delete</span></div>
        </div>
    )
})