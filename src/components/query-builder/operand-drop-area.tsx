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
    parents: string[],
}

export const OperandDropArea: FC<OperandDropAreaProps> = memo(function QueryBox({
    onDrop, formula, index, operandLocation, parents
}) {
    const { addOperandValue, addOperandUnits, addOperandValueToFormula, addOperandCriteriaToFormula, addToFormulaThirdDepth, addValueToFormulaThirdDepth } = useQueryStore();
    const [operandValue, setOperandValue] = useState('');
    const [hovered, setHovered] = useState(false);
    const [operationValuewidth, setOperationValuewidth] = useState('3ch');

    const handleHoverEnter = () => {
        setHovered(true);
    };

    const handleHoverLeave = () => {
        setHovered(false);
    };

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setOperandValue(String(event.target.value));
    };

    const handleUnitsDrop = (index: number, item: any, operandLocation: string, parents: string[]) => {
        if (parents.length == 1 && item.units && parents[0] == OperandTypes.FORMULA) {
            switch (operandLocation) {
                case 'left':
                    addOperandUnits(index, item.units, OperandTypes.LEFT_OPERAND_UNIT);
                    break;
                case 'right':
                    addOperandUnits(index, item.units, OperandTypes.RIGHT_OPERAND_UNIT);
                    break;
            }
        } else if (parents.length == 2 && item.units) {
            switch (operandLocation) {
                case 'left':
                    addOperandCriteriaToFormula(index, item.units, parents[1], OperandTypes.LEFT_OPERAND_UNIT);
                    break;
                case 'right':
                    addOperandCriteriaToFormula(index, item.units, parents[1], OperandTypes.RIGHT_OPERAND_UNIT);
                    break;
            }
        } else if (parents.length == 3 && item.units) {
            switch (operandLocation) {
                case 'left':
                    addToFormulaThirdDepth(index, item.units, parents[1], parents[2], OperandTypes.LEFT_OPERAND_UNIT);
                    break;
                case 'right':
                    addToFormulaThirdDepth(index, item.units, parents[1], parents[2], OperandTypes.RIGHT_OPERAND_UNIT);
                    break;
            }
        }
    }

    const valueUpdated = useMemo(() => {
        if (operandValue.length) {
            setOperationValuewidth((operandValue.length + 1) + 'ch');
            if (parents.length == 1 && operandValue && parents[0] == 'formula' && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValue(index, Number(operandValue), OperandTypes.LEFT_OPERAND_VALUE);
                        break;
                    case 'right':
                        addOperandValue(index, Number(operandValue), OperandTypes.RIGHT_OPERAND_VALUE);
                        break;
                }
            } else if (parents.length == 2 && operandValue && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addOperandValueToFormula(index, Number(operandValue), parents[1], OperandTypes.LEFT_OPERAND_VALUE,);
                        break;
                    case 'right':
                        addOperandValueToFormula(index, Number(operandValue), parents[1], OperandTypes.RIGHT_OPERAND_VALUE);
                        break;
                }
            } else if (parents.length == 3 && operandValue && !isNaN(Number(operandValue))) {
                switch (operandLocation) {
                    case 'left':
                        addValueToFormulaThirdDepth(index, Number(operandValue), parents[1], parents[2], OperandTypes.LEFT_OPERAND_VALUE,);
                        break;
                    case 'right':
                        addValueToFormulaThirdDepth(index, Number(operandValue), parents[1], parents[2], OperandTypes.RIGHT_OPERAND_VALUE);
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

    if (hovered) {
        border = '1px solid #006FEE';
    } else if (operandValue) {
        border = 'none';
    }
    else {
        border = '1px dashed gray'
    }

    return (
        <div className='flex items-center'>
            {formula.leftOperandFormula && operandLocation == 'left' &&
                <FormulaRender
                    formula={formula.leftOperandFormula}
                    index={index}
                    parents={[...parents, OperandTypes.LEFT_OPERAND_FORMULA]} />
            }

            {formula && formula.leftOperand && !formula.leftOperandFormula && operandLocation == 'left' &&
                <>
                    <div className='text-[#001124]'>{formula.leftOperand?.conceptName} </div>
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'left', parents)}
                        formula={formula}
                        index={index}
                        operandLocation='left'
                        parents={parents} />
                </>
            }
            {!formula?.leftOperand && operandLocation == 'left' && !formula?.leftOperandFormula &&
                <input ref={drop} value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border, backgroundColor, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }

            {formula.rightOperandFormula && operandLocation == 'right' &&
                <FormulaRender
                    formula={formula.rightOperandFormula}
                    index={index}
                    parents={[...parents, OperandTypes.RIGHT_OPERAND_FORMULA]} />
            }
            {formula && formula.rightOperand && operandLocation == 'right' && !formula.rightOperandFormula &&
                <>
                    <div className='text-[#001124]'>{formula.rightOperand?.conceptName}</div>
                    <UnitsDropArea onDrop={(item) => handleUnitsDrop(index, item, 'right', parents)}
                        formula={formula}
                        index={index}
                        operandLocation='right'
                        parents={parents} />
                </>
            }
            {!formula?.rightOperand && operandLocation == 'right' && !formula.rightOperandFormula &&
                <input ref={drop} value={operandValue} onChange={handleChange} className='h-[30px] border-dashed text-[#001124] text-center p-px'
                    style={{ width: operationValuewidth, border, backgroundColor, opacity }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
            }

        </div>
    )
})