import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Query } from "@/api/adr";
import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from '../../droppable/droppable-types';
import { DragIcon } from "../../icons";
import { OperationRender } from "../../ui/operation-render";
import type { DragItem } from '../interfaces';
import { CriteriaDropArea } from "./criteria-drop-area";

export interface QueryDropAreaProps {
    onDrop: (item: any) => void
    query: Query,
    index: number,
    groupIndex?: number[] | undefined
    depth?: number | undefined
}

export const QueryDropArea: FC<QueryDropAreaProps> = memo(function QueryBox({
    onDrop, query, index, groupIndex, depth
}) {
    const { removeFromQuery, addOperationDoubleToQuery, addOperationStringToQuery, addFocusToQuery, addFocusToQueryGrouping, addGroupOperationDoubleToQuery, addFocusToQuerySubGrouping, addOperationDoubleToGroup, removeFromQueryGroup } = useQueryStore();
    const [operationValue, setOperationValue] = useState('');
    const [hovered, setHovered] = useState(false);
    const [operationValuewidth, setOperationValuewidth] = useState('3ch');

    const handleHoverEnter = () => {
        setHovered(true);
    };

    const handleHoverLeave = () => {
        setHovered(false);
    };

    const handleRemove = (index: number) => {
        if (depth !== undefined) {
            removeFromQueryGroup(index, groupIndex as number[], depth as number);
        } else {
            removeFromQuery(index);
        }
    };

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setOperationValue(event.target.value);
    };

    const handleFocusDrop = (index: number, item: any, depth: number | undefined, groupIndex: number[] | undefined) => {
        if (groupIndex?.length == 0 && typeof depth === 'number') {
            addFocusToQueryGrouping(index, item.focus, depth);
        } else if (groupIndex?.length === 1 && typeof depth === 'number') {
            addFocusToQuerySubGrouping(index, item.focus, groupIndex[0], depth);
        } else {
            addFocusToQuery(index, item.focus);
        }
    }

    const valueUpdated = useMemo(() => {
        setOperationValuewidth((operationValue.length + 1) + 'ch');
        if (operationValue && !isNaN(Number(operationValue))) {
            if (groupIndex?.length === 0 && typeof depth === 'number') {
                addOperationDoubleToGroup(index, Number(operationValue), depth);
            }
            if (groupIndex?.length === 1 && typeof depth === 'number') {
                addGroupOperationDoubleToQuery(index, Number(operationValue), groupIndex[0], depth);
            } else {
                addOperationDoubleToQuery(index, Number(operationValue));
            }
        } else if (operationValue) {
            addOperationStringToQuery(index, operationValue);
        }
    }, [operationValue]);

    const setValue = useMemo(() => {
        if (query.operationDouble) {
            setOperationValue(String(query.operationDouble));
        } else if (query.operationText) {
            setOperationValue(query.operationText);
        }
    }, []);

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
        <div
            ref={drop}
            className='flex rounded-md h-13 w-auto px-4 py-2 items-center justify-between mb-2'
            style={{ backgroundColor, color, opacity, border }}
            key={index}>
            <div className='my-auto flex'>
                <div className='text-[#757575] m-auto'><DragIcon /></div>
                <p className='text-[#001124] flex items-center'>
                    <CriteriaDropArea
                        onDrop={(item) => handleFocusDrop(index, item, depth, groupIndex)}
                        query={query}
                    />&nbsp;
                    {query?.operation &&
                        <>
                            <OperationRender operation={query.operation} />
                        </>
                    }
                </p>
                {query?.operation &&
                    <input value={operationValue} onChange={handleChange} className='h-[30px] border-none text-[#001124] text-center p-px'
                        style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : 'none' }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
                }
            </div>
            <div><span onClick={() => handleRemove(index)} className='material-symbols-outlined text-[#757575] cursor-pointer'>delete</span></div>
        </div>
    )
})