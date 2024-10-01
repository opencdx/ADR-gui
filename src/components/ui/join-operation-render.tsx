import { JoinOperation } from "@/api/adr/model/query";
import { FC } from "react";

export interface JoinOperationRenderProps {
    joinOperation: JoinOperation
}

export const JoinOperationRender: FC<JoinOperationRenderProps> = ({ joinOperation }) => {
    switch (joinOperation) {
        case JoinOperation.And:
            return <>And</>;
        case JoinOperation.Or:
            return <>Or</>;
    }
};