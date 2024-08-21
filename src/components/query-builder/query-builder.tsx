import { CSSProperties, FC, memo, useCallback, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from './droppable-types'
import type { DragItem } from './interfaces'
import { useCriteriaStore, useQueryStore } from "@/lib/store";
import { Input } from "ui-library";

const dropBox: CSSProperties = {
    display: 'flex',
    borderRadius: '4px',
    height: '56px',
    width: '800px',
    padding: '1.1rem',
    alignItems: 'center',
    marginBottom: '4px',
}

const criteriaBox: CSSProperties = {
    display: 'flex',
    borderRadius: '4px',
    height: '56px',
    width: '800px',
    padding: '1.1rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #757575',
    marginBottom: '4px',
}

export interface QueryBuilderProps {
    onDrop: (item: any) => void
    criteria?: string
}

const QueryBuilder: FC<QueryBuilderProps> = memo(function QueryBox({
    onDrop,
})  {
    const { criteriaList, removeCriteria } = useCriteriaStore();
    const { query } = useQueryStore();

    const handleRemove = (index: number, criteria: string) => {
        //query.query?.queries.
        removeCriteria(index);
    };

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.CRITERIA, DroppableTypes.OPERATOR],
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
                {criteriaList?.map((criteria, index) => (
                    <div style={{ ...criteriaBox }}>
                        <div style={{display: "flex"}}><span className="material-symbols-outlined" style={{color: "#757575"}}>drag_indicator</span><p style={{color: "#001124"}}>{criteria}</p></div>
                        <div><span onClick={() => handleRemove(index, criteria)} className="material-symbols-outlined" style={{color: "#757575", cursor: "pointer"}}>delete</span></div>
                    </div>
                ),
                )}
                <div 
                    ref={drop}
                    style={{ ...dropBox, backgroundColor, color, border, opacity }}
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
        <QueryBuilder
            {...props}
            criteria={criteria as string}
            onDrop={handleDrop}
        />
    )
}