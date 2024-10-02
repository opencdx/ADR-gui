import { JoinOperation } from "@/api/adr";
import { useQueryStore } from "@/lib/store";
import { FC } from "react";
import { DeleteIcon } from "ui-library";
import { JoinOperationRender } from "../ui/join-operation-render";

export interface JoinOperationBoxProps {
    joinOperation: JoinOperation,
    index: number,
    groupIndex?: number[],
    depth?: number
}

export const JoinOperationBox: FC<JoinOperationBoxProps> = ({ joinOperation, index, groupIndex, depth }) => {
    const { removeFromQuery , removeFromQueryGroup} = useQueryStore();

    const handleRemove = (index: number) => {
        if (depth !== undefined) {
            removeFromQueryGroup(index, groupIndex as number[], depth as number);
        } else {
            removeFromQuery(index);
        }
    };

    return (
        <div>
            <div className='flex rounded-md h-12 w-auto px-4 py-2 items-center justify-between border border-[#757575] bg-white'>
                <div className='flex'><span className="material-symbols-outlined" style={{ color: "#757575" }}>drag_indicator</span><p style={{ color: "#001124" }}><JoinOperationRender joinOperation={joinOperation}/></p></div>
                <div className='flex cursor-pointer text-[#757575]' onClick={() => handleRemove(index)}><DeleteIcon /></div>
            </div>
        </div>
    )
}