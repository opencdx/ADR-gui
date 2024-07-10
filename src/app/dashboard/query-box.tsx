import { CSSProperties, FC, memo, useCallback, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { CriteriaTypes } from './criteria-types'
import type { DragItem } from './interfaces'
import { useCriteriaStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

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

const criteriaRemove: CSSProperties = {
    float: 'right',
    width: 'auto',
}

export interface QueryBoxProps {
    onDrop: (item: any) => void
    criteria?: string
}

const QueryBox: FC<QueryBoxProps> = memo(function QueryBox({
    onDrop,
    criteria,
})  {
    const { criteriaList, removeCriteria } = useCriteriaStore();
    const { addCriteria } = useCriteriaStore();

    const handleRemove = (index: number) => {
        removeCriteria(index);
    };

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [CriteriaTypes.AGE, CriteriaTypes.BMI, CriteriaTypes.GENDER, CriteriaTypes.HEIGHT, CriteriaTypes.ID, CriteriaTypes.WEIGHT],
            drop(_item: DragItem, monitor) {
                onDrop(monitor.getItemType())
                addCriteria(monitor.getItemType() as string)
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
        <div>
            {criteriaList?.map((criteria, index) => (
                <div style={{ ...criteriaBox }}>
                    <div style={{display: "flex"}}><span class="material-symbols-outlined" style={{color: "#757575"}}>drag_indicator</span><p style={{color: "#001124"}}>{criteria}</p></div>
                    <div><span onClick={() => handleRemove(index)} class="material-symbols-outlined" style={{color: "#757575", cursor: "pointer"}}>delete</span></div>
                </div>
            ),
            )}
            <div 
                ref={drop}
                style={{ ...dropBox, backgroundColor, color, border, opacity }}
                role="QueryBox"
            >
                {isActive ? 'Release to add' : 'Drag a criteria here and begin defining'}
            </div>
        </div>
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
        <QueryBox
            {...props}
            criteria={criteria as string}
            onDrop={handleDrop}
        />
    )
}