import { FC, memo, useState, SetStateAction, useMemo, useRef, useEffect } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula, Query } from "@/api/adr";
import { DragIcon } from "../icons";
import { FormulaRender } from "./formula-render";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DroppableTypes } from "../droppable/droppable-types";
import type { DragItem } from './interfaces'
import { OperationRender } from "../ui/operation-render";

export interface FormulaBoxProps {
    onDrop: (item: any) => void
    formula: Formula,
    query: Query,
    index: number,
    parents: string[],
}

export const FormulaBox: FC<FormulaBoxProps> = memo(function QueryBox({
    onDrop, formula, query, index, parents
}) {
    const { removeFromQuery, addOperationDoubleToQuery, addOperationStringToQuery, addNameToFormula } = useQueryStore();
    const [operationValue, setOperationValue] = useState('');
    const [hovered, setHovered] = useState(false);
    const [operationValuewidth, setOperationValuewidth] = useState('3ch');
    const formulaRef = useRef<HTMLDivElement>(null);
    const [formulaText, setFormulaText] = useState('');

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
        setOperationValuewidth((operationValue.length + 1) + 'ch');
        if (operationValue && !isNaN(Number(operationValue))) {
            addOperationDoubleToQuery(index, Number(operationValue));
        } else if (operationValue) {
            addOperationStringToQuery(index, operationValue);
        }
    }, [operationValue]);

    const setFormulaName = useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            if (formulaRef.current?.textContent) {
                addNameToFormula(index, formulaRef.current?.textContent);
            }
        });

        if (formulaRef.current) {
            observer.observe(formulaRef.current, { childList: true, subtree: true });
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [formulaRef, formulaText]);

    const setValue = useMemo(() => {
        if (query.operationDouble) {
            setOperationValue(String(query.operationDouble));
        } else if (query.operationText) {
            setOperationValue(query.operationText);
        }

        setFormulaName;
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
        <div ref={drop}
            className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'
            style={{ backgroundColor, opacity, border }}>
            <div className='my-auto flex items-center'>
                <div className='text-[#757575] m-auto'><DragIcon /></div>
                <div ref={formulaRef} className='flex items-center'>
                <FormulaRender
                    formula={formula!}
                    index={index}
                    parents={parents} />
                {query?.operation &&
                    <p className='ml-3'>
                        <OperationRender operation={query.operation} />
                    </p>
                }
                {query?.operation &&
                    <input value={operationValue} onChange={handleChange} className='h-[30px] border-none text-[#001124] text-center p-px'
                        style={{ width: operationValuewidth, border: hovered ? '1px solid #006FEE' : 'none' }} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}></input>
                }
                </div>
            </div>
            <div><span onClick={() => handleRemove(index)} className='material-symbols-outlined text-[#757575] cursor-pointer'>delete</span></div>
        </div>
    )
})