import { FC, memo, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import { Formula, Query } from "@/api/adr";
import { useQueryStore } from "@/lib/store";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DeleteIcon, DragIcon } from 'ui-library';
import { DroppableTypes } from "../droppable/droppable-types";
import { OperationRender } from "../ui/operation-render";
import { FormulaRender } from "./formula-render";
import type { DragItem } from './interfaces';

export interface FormulaBoxProps {
    onDrop: (item: any) => void
    formula: Formula,
    query: Query,
    index: number,
    parents: string[],
    groupIndex?: number[],
    depth?: number
}

export const FormulaBox: FC<FormulaBoxProps> = memo(function QueryBox({
    onDrop, formula, query, index, parents, groupIndex, depth
}) {
    const { removeFromQuery, addOperationDoubleToQuery, addOperationStringToQuery, addNameToFormula, addNameToGroupingFormula, addNameToSubGroupFormula, addGroupOperationDoubleToQuery, addOperationDoubleToGroup, addOperationStringToGroup, addGroupOperationStringToQuery, removeFromQueryGroup } = useQueryStore();
    const [operationValue, setOperationValue] = useState('');
    const [hovered, setHovered] = useState(false);
    const [operationValuewidth, setOperationValuewidth] = useState('3ch');
    const formulaRef = useRef<HTMLDivElement>(null);
    const [formulaText, setFormulaText] = useState('');

    const useMutationObserver = (
        ref: RefObject<HTMLDivElement>,
        callback: MutationCallback,
        options = {
            characterData: true,
            childList: true,
            subtree: true,
            attributes: true,
        }
    ) => {
        useEffect(() => {
            if (ref.current) {
                const observer = new MutationObserver(callback);
                observer.observe(ref.current, options);
                return () => observer.disconnect();
            }
        }, [ref])
    };
    const updateFormulaName = () => {
        if (formulaRef.current?.textContent) {
            if (!groupIndex || groupIndex.length == 0) {
                addNameToFormula(index, formulaRef.current?.textContent);
            } else if (groupIndex?.length === 1) {
                addNameToGroupingFormula(index, groupIndex[0], formulaRef.current?.textContent);
            } else if (groupIndex?.length === 2) {
                addNameToSubGroupFormula(index, groupIndex[0], groupIndex[1], formulaRef.current?.textContent);
            }
        }
    };
    useMutationObserver(formulaRef, updateFormulaName);

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

    const valueUpdated = useMemo(() => {
        setOperationValuewidth((operationValue.length + 1) + 'ch');
        if (operationValue && !isNaN(Number(operationValue))) {
            if (groupIndex?.length && groupIndex?.length === 1) {
                addOperationDoubleToGroup(index, Number(operationValue), groupIndex[0]);
            } else if (groupIndex?.length && groupIndex?.length === 2) {
                addGroupOperationDoubleToQuery(index, Number(operationValue), groupIndex[0], groupIndex[1]);
            } else {
                addOperationDoubleToQuery(index, Number(operationValue));
            }
        } else if (operationValue) {
            if (groupIndex?.length && groupIndex?.length === 1) {
                addOperationStringToGroup(index, operationValue, groupIndex[0]);
            } else if (groupIndex?.length && groupIndex?.length === 2) {
                addGroupOperationStringToQuery(index, operationValue, groupIndex[0], groupIndex[1]);
            } else {
                addOperationStringToQuery(index, operationValue);
            }
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
            accept: [DroppableTypes.ARITHMETIC_OPERATOR, DroppableTypes.RELATIONAL_OPERATOR],
            drop(_item: DragItem, monitor) {
                const didDrop = monitor.didDrop();
                if (didDrop) {
                    return;
                }
                onDrop(monitor.getItem());
                return;
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
        <div ref={drop}
            className='flex rounded-md h-12 w-auto px-4 py-2 items-center justify-between border border-[#757575]'
            style={{ backgroundColor, opacity, border }}>
            <div className='my-auto flex items-center'>
                <div className='text-[#757575] m-auto flex'><DragIcon /></div>
                <div ref={formulaRef} className='flex items-center'>
                    <FormulaRender
                        formula={formula}
                        index={index}
                        parents={parents}
                        groupIndex={groupIndex} />
                </div>
                {query?.operation &&
                    <p className='ml-3'>
                        <OperationRender operation={query.operation} />
                    </p>
                }
                {query?.operation &&
                    <>
                        <input value={operationValue} onChange={handleChange} className='h-[30px] border-none text-[#001124] text-center p-px'
                            style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : 'none' }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} />
                        <p className='hidden'>{operationValue} </p>
                    </>
                }
            </div>
            <div className='flex cursor-pointer text-[#757575]' onClick={() => handleRemove(index)}><DeleteIcon /></div>
        </div>
    )
})