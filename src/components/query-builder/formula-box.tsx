import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula, Query } from "@/api/adr";
import { OperandDropArea } from "./operand-drop-area";
import { DragIcon } from "../icons";
import { OperationDropArea } from "./operation-drop-area";
import { FormulaRender } from "./formula-render";

export interface FormulaBoxProps {
    formula: Formula,
    index: number,
    parent: string,
}

export const FormulaBox: FC<FormulaBoxProps> = memo(function QueryBox({
    formula, index, parent
}) {
    const { removeFromQuery, addLeftOperandCriteria, addRightOperandCriteria, addOperationToFormula, addLeftOperandValue, addRightOperandValue,
        addLeftOperandFormula, addRightOperandFormula
    } = useQueryStore();

    const handleOperandDrop = (index: number, item: any, operandLocation: string) => {
        if (item.criteria) {
            switch (operandLocation) {
                case 'left':
                    addLeftOperandValue(index, null);
                    addLeftOperandCriteria(index, item.criteria);
                    break;
                case 'right':
                    addRightOperandValue(index, null);
                    addRightOperandCriteria(index, item.criteria);
                    break;
            }
        } else if (item.formula) {
            switch (operandLocation) {
                case 'left':
                    addLeftOperandValue(index, null);
                    addLeftOperandFormula(index);
                    break;
                case 'right':
                    addRightOperandValue(index, null);
                    addRightOperandFormula(index);
                    break;
            }
        }
    }

    const handleOperationDrop = (index: number, item: any) => {
        if (item.operation) {
            addOperationToFormula(index, item.operation);
        }
    }

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    return (
        <div className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'>
            <div className='my-auto flex'>
                <div className='text-[#757575] m-auto'><DragIcon /></div>
                <FormulaRender
                    formula={formula!}
                    index={index}
                    parent={parent} />
            </div>
            <div><span onClick={() => handleRemove(index)} className='material-symbols-outlined text-[#757575] cursor-pointer'>delete</span></div>
        </div>
    )
})