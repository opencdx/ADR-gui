import { CSSProperties, FC, memo, useCallback, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";

export interface QueryDropAreaProps {
    onDrop: (item: any) => void
    criteria?: string
}

const QueryDropArea: FC<QueryDropAreaProps> = memo(function QueryBox({
    onDrop,
}) {
    const { removeFromQuery } = useQueryStore();
    const query = useQueryStore((state) => state.query);

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.CRITERIA, DroppableTypes.JOIN_OPERATION],
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
    )

    const opacity = isOver ? 0.7 : 1
    let backgroundColor = '#fff'
    let color = '#6E6E6E'
    let border = '1px dashed gray'
    if (draggingColor) {
        backgroundColor = '#76B8DF'
        color = '#0066FF'
        border = '1px solid #0066FF'
    }

    return (
        <>
            <div>
                {query?.query?.queries?.map((query, index) => {
                    let queryBox;
                    if (query.joinOperation) {
                        queryBox = (
                            <div className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'>
                                <div className='flex'><span className="material-symbols-outlined" style={{ color: "#757575" }}>drag_indicator</span><p style={{ color: "#001124" }}>{query.joinOperation}</p></div>
                                <div><span onClick={() => handleRemove(index)} className="material-symbols-outlined" style={{ color: "#757575", cursor: "pointer" }}>delete</span></div>
                            </div>
                        );
                    } else if (query.concept) {
                        queryBox = (
                            <div className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'>
                                <div className='flex' ><span className="material-symbols-outlined" style={{ color: "#757575" }}>drag_indicator</span><p style={{ color: "#001124" }}>{query.concept.conceptName}</p></div>
                                <div><span onClick={() => handleRemove(index)} className="material-symbols-outlined" style={{ color: "#757575", cursor: "pointer" }}>delete</span></div>
                            </div>
                        )
                    }
                    return (queryBox);
                })}
                <div
                    ref={drop}
                    className='flex rounded-md h-14 w-auto px-4 py-2 items-center mb-2'
                    style={{ backgroundColor, color, border, opacity }}
                    role="QueryBox"
                >
                    {isActive ? 'Release to add' : 'Drag criteria and or operators here in the Query Field and begin defining'}
                </div>
            </div>
        </>
    )
})

export interface StatefulQueryBoxState {
    criteriaList: []
}

export const StatefulQueryBox: FC = (props) => {
    const [criteria, setCriteria] = useState<string | null>(null)
    const handleDrop = useCallback(
        (criteria: string) => setCriteria(criteria),
        [],
    )

    return (
        <QueryDropArea
            {...props}
            criteria={criteria as string}
            onDrop={handleDrop}
        />
    )
}