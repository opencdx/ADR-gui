import { useQueryStore } from '@/lib/store';
import { AddQueryDropArea } from './drop-area/add-query-drop-area';
import { QueryDropArea } from './drop-area/query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';
import { OperandTypes } from './operand-types';
import { Button } from 'ui-library';
import { useState } from 'react';
import { GroupBox } from './group-box';

export default function QueryRender() {

    const [newQueryField, setNewQueryField] = useState(false);

    const { query, addCriteriaToQuery, addOperationToQuery, addFormulaToQuery, resetQueryStore, addGroupToQuery, addJoinOperationToQuery } = useQueryStore();

    const handleDrop = (index: number, item: any) => {
        if (item.criteria) {
            addCriteriaToQuery(item.criteria);
        } else if (item.operation && isOperation(item.operation)) {
            addOperationToQuery(index, item.operation);
        } else if (item.formula) {
            addFormulaToQuery();
        } else if (item.group) {
            addGroupToQuery();
        } else if (item.joinOperation) {
            addJoinOperationToQuery(item.joinOperation);
        }

        setNewQueryField(false);
    }

    function isOperation(value: unknown): value is Operation {
        return Object.values(Operation).includes(value as Operation);
    }

    const updateNewQuery = () => {
        setNewQueryField(true);
    }

    const clearAll = () => {
        resetQueryStore();
        setNewQueryField(true);
    }

    return (
        <>
            <div className='max-h-[calc(100vh-400px)] overflow-y-auto'>
                {query?.query?.queries?.map((currentQuery, index) => {
                    return <div key={index} className='mb-2'>
                        {currentQuery.concept && (
                            <QueryDropArea
                                onDrop={(item) => handleDrop(index, item)}
                                query={currentQuery}
                                index={index}
                                key={index} />
                        )}


                        {currentQuery.formula && (
                            <FormulaBox
                                onDrop={(item) => handleDrop(index, item)}
                                formula={currentQuery.formula}
                                query={currentQuery}
                                index={index}
                                parents={[OperandTypes.FORMULA]}
                                key={index} />
                        )}
                        {(currentQuery.joinOperation &&
                            !(currentQuery.joinOperation && query && query.query && query.query.queries && query.query.queries.at(index + 1) && query.query.queries.at(index + 1)?.group)) && (
                                <JoinOperationBox joinOperation={currentQuery.joinOperation} index={index} key={index} />
                            )}
                        {currentQuery.group && (
                            <GroupBox
                                onDrop={(item) => handleDrop(index, item)}
                                group={currentQuery.group}
                                parentGroupIndex={[]}
                                query={currentQuery}
                                index={index}
                                key={index}
                                joinOperation={query?.query?.queries?.at(index - 1)?.joinOperation} />
                        )}
                    </div>
                })}


            </div>
            {(newQueryField || query?.query?.queries?.length == 0) && (
                <AddQueryDropArea
                    onDrop={(item) => handleDrop(-1, item)} />
            )}
            {query?.query?.queries && query?.query?.queries.length > 0 && (
                <div className='float-right'>
                    <Button className='m-1 bg-[#E6F1FE] text-[#006FEE]' onClick={clearAll}>Clear All</Button>
                    <Button className='ml-1 bg-[#E6F1FE] text-[#006FEE]' onClick={updateNewQuery}>New Query Field</Button>
                </div>
            )}
        </>
    )
}
