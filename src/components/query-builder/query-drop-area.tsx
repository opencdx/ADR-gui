import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Query } from "@/api/adr";
import { OperationRender } from "../ui/operation-render";
import { DragIcon } from "../icons";

export interface QueryDropAreaProps {
    onDrop: (item: any) => void
    query: Query,
    index: number
}

export const QueryDropArea: FC<QueryDropAreaProps> = memo(function QueryBox({
    onDrop, query, index
}) {
    const { removeFromQuery, addOperationDoubleToQuery, addOperationStringToQuery } = useQueryStore();
    const [ operationValue, setOperationValue ] = useState('');
    let operationValuewidth = '3ch';

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setOperationValue(event.target.value);
    };

    const valueUpdated = useMemo(() => {
        operationValuewidth = (operationValue.length + 1) + 'ch';

        if (!isNaN(Number(operationValue))) {
            addOperationDoubleToQuery(index, Number(operationValue));
        } else {
            addOperationStringToQuery(index, operationValue);
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
        <div
            ref={drop}
            className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between mb-2'
            style={{ backgroundColor, color, opacity, border }}
            key={index}>
            <div className='my-auto flex'>
                <div className='text-[#757575] m-auto'><DragIcon /></div>
                <p className='text-[#001124] m-auto'>[{query.concept?.conceptName}]&nbsp;
                    {query?.operation &&
                        <>
                            <OperationRender operation={query.operation} />
                        </>
                    }
                </p>
                {query?.operation &&
                    <input value={operationValue} onChange={handleChange} className='h-[30px] border-none text-[#001124] text-center p-px' style={{ width: operationValuewidth }}></input>
                }
            </div>
            <div><span onClick={() => handleRemove(index)} className='material-symbols-outlined text-[#757575] cursor-pointer'>delete</span></div>
        </div>
    )
})