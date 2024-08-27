import { useQueryStore } from '@/lib/store';
import { StatefulQueryBox as AddQueryBox } from './add-query-drop-area';
import { QueryDropArea } from './query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { useCallback } from 'react';

export default function QueryRender() {

    const query = useQueryStore((state) => state.query);

    const handleDrop = useCallback((index: number, item: any) => {

    }, []
    )

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
