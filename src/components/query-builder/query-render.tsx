import { useQueryStore } from '@/lib/store';
import { AddQueryDropArea } from './add-query-drop-area';
import { QueryDropArea } from './query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { JoinOperation, Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';
import { OperandTypes } from './operand-types';
import { Button } from 'ui-library';
import { useState } from 'react';
import { GroupBox } from './group-box';

export default function QueryRender() {

    const [newQueryField, setNewQueryField] = useState(true);

    const { query, addCriteriaToQuery, addOperationToQuery, addFormulaToQuery, resetQueryStore,addGroupToQuery } = useQueryStore();

    const handleDrop = (index: number, item: any) => {
        if (item.criteria) {
            addCriteriaToQuery(item.criteria);
        } else if (item.operation && isOperation(item.operation)) {
            addOperationToQuery(index, item.operation);
        } else if (item.formula) {
            addFormulaToQuery();
        } else if (item.group) {
            addGroupToQuery();
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
            {query?.query?.queries?.map((query, index) => {
                return <div key={index}>
                     {query.concept && (
                        <QueryDropArea
                            onDrop={(item) => handleDrop(index, item)}
                            query={query}
                            index={index}
                            key={index} />
                    )}
                   
                   
                    {query.formula && (
                        <FormulaBox
                            onDrop={(item) => handleDrop(index, item)}
                            formula={query.formula}
                            query={query}
                            index={index}
                            parents={[OperandTypes.FORMULA]}
                            key={index} />
                    )}
                     {query.joinOperation && (
                        <JoinOperationBox joinOperation={query.joinOperation} index={index} key={index} />
                    )}
                    {query.group && (
                        <GroupBox
                            onDrop={(item) => handleDrop(index, item)}
                            group={query.group}
                            query={query}
                            index={index}
                            key={index} />
                    )}
                </div>
            })}
            {newQueryField && 
                <AddQueryDropArea
                    onDrop={(item) => handleDrop(-1, item)} />
            }
            {query?.query?.queries && query?.query?.queries.length > 0 && (
                <div className='float-right'>
                    <Button className='m-1 bg-[#E6F1FE] text-[#006FEE]' onClick={clearAll}>Clear All</Button>
                    <Button className='m-1 bg-[#E6F1FE] text-[#006FEE]' onClick={updateNewQuery}>New Query Field</Button>
                </div>
            )}
        </>
    )
}
