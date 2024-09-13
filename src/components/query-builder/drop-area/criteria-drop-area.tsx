import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../../droppable/droppable-types'
import type { DragItem } from '../interfaces'
import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { OperandTypes } from "../operand-types";
import { FocusRender } from "@/components/ui/focus-render";

export interface CriteriaDropAreaProps {
    formula?: Formula,
    index: number,
    operandLocation?: string,
    parents?: string[],
    groupIndex?: number,
}

export const CriteriaDropArea: FC<CriteriaDropAreaProps> = memo(function QueryBox({
    formula, index, operandLocation, parents, groupIndex
}) {
    const { removeFromQuery, addOperationDoubleToQuery, addOperationStringToQuery } = useQueryStore();
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
        removeFromQuery(index);
    };

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setOperationValue(event.target.value);
    };

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
            accept: [DroppableTypes.FOCUS],
            drop(_item: DragItem, monitor) {
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
            end: (item: any, monitor: any) => {
                console.log(item);
                console.log(monitor);
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