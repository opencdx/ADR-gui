import { FC } from "react";
import { useQueryStore } from "@/lib/store";
import { JoinOperation } from "@/api/adr";

export interface JoinOperationBoxProps {
    joinOperation: JoinOperation,
    index: number,
}

export const JoinOperationBox: FC<JoinOperationBoxProps> = ({ joinOperation, index }) => {
    const { removeFromQuery } = useQueryStore();

    const handleRemove = (index: number) => {
        removeFromQuery(index);
    };

    return (
        <div>
            <div className='flex rounded-md h-14 w-auto px-4 py-2 items-center justify-between border border-[#757575] mb-2'>
                <div className='flex'><span className="material-symbols-outlined" style={{ color: "#757575" }}>drag_indicator</span><p style={{ color: "#001124" }}>{joinOperation}</p></div>
                <div><span onClick={() => handleRemove(index)} className="material-symbols-outlined" style={{ color: "#757575", cursor: "pointer" }}>delete</span></div>
            </div>
        </div>
    )
}