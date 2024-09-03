import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Query } from "@/api/adr";
import { UnitsDropArea } from "./units-drop-area";

export interface OperandDropAreaProps {
    onDrop: (item: any) => void
    query: Query,
    index: number,
    operandLocation: string,
}

export const OperandDropArea: FC<OperandDropAreaProps> = memo(function QueryBox({
    onDrop, query, index, operandLocation
}) {
    const { removeFromQuery, addLeftOperandValue, addRightOperandValue, addLeftOperandUnits, addRightOperandUnits } = useQueryStore();
    const [operandValue, setOperandValue] = useState('');
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
        setOperandValue(String(event.target.value));
    };

    const handleUnitsDrop = (index: number, item: any, operandLocation: string) => {
        if (item.units) {
            switch (operandLocation) {
                case 'left':
                    addLeftOperandUnits(index, item.units);
                    break;
                case 'right':
                    addRightOperandUnits(index, item.units);
                    break;
            }
        }
    }

    const valueUpdated = useMemo(() => {
        if (operandValue.length) {
            setOperationValuewidth((operandValue.length + 1) + 'ch');
            if (operandValue && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addLeftOperandValue(index, Number(operandValue));
                        break;
                    case 'right':
                        addRightOperandValue(index, Number(operandValue));
                        break;
                }
            }
        }
    }, [operandValue]);

    const setValue = useMemo(() => {
        if (query.formula?.leftOperandValue) {
            setOperandValue(String(query.formula.leftOperandValue));
        } else if (query.formula?.rightOperandValue) {
            setOperandValue(String(query.formula.rightOperandValue));
        }
    }, []);

    const [{ isActive, isOver, canDrop, draggingColor }, drop] = useDrop(
        () => ({
            accept: [DroppableTypes.CRITERIA, DroppableTypes.FORMULA],
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
            {query.formula && query.formula.leftOperand && operandLocation == 'left' &&
                <div className='flex'>
                    <div>{query.formula.leftOperand?.conceptName} &nbsp;</div>
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'left')}
                        query={query}
                        index={index} />
                </div>
            }
            {!query.formula?.leftOperand && operandLocation == 'left' &&
                <input value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
            {query.formula && query.formula.rightOperand && operandLocation == 'right' &&
                <div>&nbsp; {query.formula.leftOperand?.conceptName}</div>
            }
            {!query.formula?.rightOperand && operandLocation == 'right' &&
                <input value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
        </div>
    )
})