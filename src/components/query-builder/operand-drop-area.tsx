import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Formula, Query } from "@/api/adr";
import { UnitsDropArea } from "./units-drop-area";
import { OperationDropArea } from "./operation-drop-area";
import { FormulaBox } from "./formula-box";
import { FormulaRender } from "./formula-render";

export interface OperandDropAreaProps {
    onDrop: (item: any) => void
    formula: Formula,
    index: number,
    operandLocation: string,
    parent: string
}

export const OperandDropArea: FC<OperandDropAreaProps> = memo(function QueryBox({
    onDrop, formula, index, operandLocation, parent
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

    const handleOperandDrop = (index: number, item: any, operandLocation: string) => {
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    //addLeftOperandValue(index, null);
                    //addLeftOperandCriteria(index, item.criteria);
                    break;
                case 'right':
                    // addRightOperandValue(index, null);
                    // addRightOperandCriteria(index, item.criteria);
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    // addLeftOperandValue(index, null);
                    // addLeftOperandFormula(index);
                    break;
                case 'right':
                    // addRightOperandValue(index, null);
                    // addRightOperandFormula(index);
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any) => {
        if (item.operation) {
            //addOperationToFormula(index, item.operation);
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
        if (formula?.leftOperandValue) {
            setOperandValue(String(formula.leftOperandValue));
        } else if (formula?.rightOperandValue) {
            setOperandValue(String(formula.rightOperandValue));
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
        <div ref={drop} className='flex'>
            {formula.leftOperandFormula && parent == 'formula' &&
                <FormulaRender
                    formula={formula}
                    index={index}
                    parent='leftOperandFormula' />
            }
            {formula && formula.leftOperand && !formula.leftOperandFormula && operandLocation == 'left' &&
                <>
                    <div>{formula.leftOperand?.conceptName} </div>
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'left')}
                        formula={formula}
                        index={index}
                        operandLocation='left'/>
                </>
            }
            {!formula?.leftOperand && operandLocation == 'left' && !formula?.leftOperandFormula && !formula.leftOperandFormula &&
                <input value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
            {formula && formula.rightOperand && operandLocation == 'right' && !formula.leftOperandFormula &&
                <> {formula.rightOperand?.conceptName}
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'right')}
                        formula={formula}
                        index={index}
                        operandLocation='right'/>
                </>
            }
            {!formula?.rightOperand && operandLocation == 'right' && !formula.leftOperandFormula &&
                <input value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
        </div>
    )
})