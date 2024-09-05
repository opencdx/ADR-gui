import { FC, memo } from "react";

import { useQueryStore } from "@/lib/store";
import { Formula } from "@/api/adr";
import { DragIcon } from "../icons";
import { FormulaRender } from "./formula-render";

export interface FormulaBoxProps {
    formula: Formula,
    index: number,
    parents: [],
}

export const FormulaBox: FC<FormulaBoxProps> = memo(function QueryBox({
    formula, index, parents
}) {
    const { removeFromQuery } = useQueryStore();

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
                    parents={parents} />
            </div>
            <div><span onClick={() => handleRemove(index)} className='material-symbols-outlined text-[#757575] cursor-pointer'>delete</span></div>
        </div>
    )
})