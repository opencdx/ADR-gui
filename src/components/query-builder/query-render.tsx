import { useQueryStore } from '@/lib/store';
import { StatefulQueryBox as AddQueryBox } from './add-query-drop-area';
import { QueryDropArea } from './query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { useCallback } from 'react';
import { Operation } from '@/api/adr/model/query';

export default function QueryRender() {

    const { query, addOperationToQuery } =  useQueryStore();

    const handleDrop = (index: number, item: any) => {
        if (item.operation && isOperation(item.operation)) {
            addOperationToQuery(index, item.operation);
        }
    }

    function isOperation(value: unknown): value is Operation {
        return Object.values(Operation).includes(value as Operation);
    }

    return (
        <>
            {query?.query?.queries?.map((query, index) => {
                if (query.joinOperation) {
                    return <JoinOperationBox joinOperation={query.joinOperation} index={index} />
                } else if (query.concept) {
                    return <QueryDropArea
                        onDrop={(item) => handleDrop(index, item)}
                        query={query}
                        index={index} />
                }
            })}
            <AddQueryBox />
        </>
    )
}
