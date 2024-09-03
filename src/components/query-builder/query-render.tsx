import { useQueryStore } from '@/lib/store';
import { AddQueryDropArea } from './add-query-drop-area';
import { QueryDropArea } from './query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';

export default function QueryRender() {

    const { query, addCriteriaToQuery, addOperationToQuery } =  useQueryStore();

    const handleDrop = (index: number, item: any) => {
        if (item.criteria) {
            addCriteriaToQuery(item.criteria);
        } else if (item.operation && isOperation(item.operation)) {
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
                } else if (query.formula) {
                    return <FormulaBox
                        query={query}
                        index={index} />
                }
            })}
            <AddQueryDropArea 
                onDrop={(item) => handleDrop(-1, item)} />
        </>
    )
}
