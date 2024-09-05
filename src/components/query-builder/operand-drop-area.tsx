import { FC, memo, SetStateAction, useMemo, useState } from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd'

import { DroppableTypes } from '../droppable/droppable-types'
import type { DragItem } from './interfaces'
import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { UnitsDropArea } from "./units-drop-area";
import { FormulaRender } from "./formula-render";
import { OperandTypes } from "./operand-types";

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
    const { removeFromQuery, addOperandValue, addOperandUnits, addOperandValueToFormula, addOperandCriteriaToFormula } = useQueryStore();
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

    const handleUnitsDrop = (index: number, item: any, operandLocation: string, parent: string) => {
        if (item.units && parent == OperandTypes.FORMULA) {
            switch (operandLocation) {
                case 'left':
                    addOperandUnits(index, item.units, OperandTypes.LEFT_OPERAND_UNIT);
                    break;
                case 'right':
                    addOperandUnits(index, item.units, OperandTypes.RIGHT_OPERAND_UNIT);
                    break;
            }
        } else if (item.units && (parent == OperandTypes.LEFT_OPERAND_FORMULA || parent == OperandTypes.RIGHT_OPERAND_FORMULA)) {
            if (parent == OperandTypes.LEFT_OPERAND_FORMULA) {
                switch (operandLocation) {
                    case 'left':
                        addOperandCriteriaToFormula(index, item.units, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND_UNIT);
                        break;
                    case 'right':
                        addOperandCriteriaToFormula(index, item.units, OperandTypes.LEFT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND_UNIT);
                        break;
                }
            } else if (parent == OperandTypes.RIGHT_OPERAND_FORMULA) { 
                switch (operandLocation) {
                    case 'left':
                        addOperandCriteriaToFormula(index, item.units, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.LEFT_OPERAND_UNIT);
                        break;
                    case 'right':
                        addOperandCriteriaToFormula(index, item.units, OperandTypes.RIGHT_OPERAND_FORMULA, OperandTypes.RIGHT_OPERAND_UNIT);
                        break;
                }
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
            if (operandValue && parent == 'formula' && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValue(index, Number(operandValue), OperandTypes.LEFT_OPERAND_VALUE);
                        break;
                    case 'right':
                        addOperandValue(index, Number(operandValue), OperandTypes.RIGHT_OPERAND_VALUE);
                        break;
                }
            } else if (operandValue && (parent == OperandTypes.LEFT_OPERAND_FORMULA || parent == OperandTypes.RIGHT_OPERAND_FORMULA) && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValueToFormula(index, Number(operandValue), parent, OperandTypes.LEFT_OPERAND_VALUE,);
                        break;
                    case 'right':
                        addOperandValueToFormula(index, Number(operandValue), parent, OperandTypes.RIGHT_OPERAND_VALUE);
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
        <div className='flex'>
            {formula.leftOperandFormula && parent == 'formula' && operandLocation == 'left' &&
                <FormulaRender
                    formula={formula.leftOperandFormula}
                    index={index}
                    parent={OperandTypes.LEFT_OPERAND_FORMULA} />
            }
            {formula && formula.leftOperand && !formula.leftOperandFormula && operandLocation == 'left' &&
                <>
                    <div>{formula.leftOperand?.conceptName} </div>
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'left', parent)}
                        formula={formula}
                        index={index}
                        operandLocation='left'
                        parent={parent} />
                </>
            }
            {!formula?.leftOperand && operandLocation == 'left' && !formula?.leftOperandFormula &&
                <input ref={drop} value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
            {formula.rightOperandFormula && parent == 'formula' && operandLocation == 'right' &&
                <FormulaRender
                    formula={formula.rightOperandFormula}
                    index={index}
                    parent={OperandTypes.RIGHT_OPERAND_FORMULA} />
            }
            {formula && formula.rightOperand && operandLocation == 'right' && !formula.rightOperandFormula &&
                <> {formula.rightOperand?.conceptName}
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'right', parent)}
                        formula={formula}
                        index={index}
                        operandLocation='right'
                        parent={parent} />
                </>
            }
            {!formula?.rightOperand && operandLocation == 'right' && !formula.rightOperandFormula &&
                <input ref={drop} value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : '1px dashed gray', backgroundColor, color, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }
        </div>
    )
})