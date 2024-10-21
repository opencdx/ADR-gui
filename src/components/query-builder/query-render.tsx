import { useQueryStore } from '@/lib/store';
import { AddQueryDropArea } from './drop-area/add-query-drop-area';
import { QueryDropArea } from './drop-area/query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';
import { OperandTypes } from './operand-types';
import { Button, ExpandIcon, RightChevronIcon } from 'ui-library';
import { useState } from 'react';
import { GroupBox } from './group-box';

export default function QueryRender() {

    const [newQueryField, setNewQueryField] = useState(false);
    const [isExpanded, setIsExpanded] = useState<Map<number, boolean>>(new Map());

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

    const toggleIsExpanded = (key: number) => {
        setIsExpanded((prevState) => {
            const newMap = new Map(prevState);
            newMap.set(key, !newMap.get(key));
            return newMap;
        });
    };

    return (
        <>
            <div className='max-h-[calc(100vh-400px)] overflow-y-auto'>
                {query?.query?.queries?.map((currentQuery, index) => {
                    return (
                        <>
                            {currentQuery.group && (
                                <GroupBox
                                    onDrop={(item) => handleDrop(index, item)}
                                    group={currentQuery.group}
                                    parentGroupIndex={[]}
                                    query={currentQuery}
                                    index={index}
                                    key={index}
                                    joinOperation={(index !== 0) ? query?.query?.queries?.at(index - 1)?.joinOperation : undefined} />
                            )}
                            {(!currentQuery.group &&
                            !(currentQuery.joinOperation && query && query.query && query.query.queries && query.query.queries.at(index + 1) && query.query.queries.at(index + 1)?.group)) && (
                                <div className="accordion-container rounded-md border border-[#CCE3FD] bg-[#F6FAFF] mb-2 w-full mt-2">
                                    <div className="accordion-header flex items-end  bg-[#F6FAFF]  rounded-t-md cursor-pointer justify-between flex py-2" onClick={() => toggleIsExpanded(index)}>
                                        <div></div>
                                        <div className='flex my-auto text-[#66AAF9]'>
                                            {!isExpanded.get(index) ? <ExpandIcon /> : <RightChevronIcon />}
                                        </div>
                                    </div>
                                    {!isExpanded.get(index) && (
                                        <div key={index} className='mb-4 mx-7 mt-[-12px]'>
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
                                                    joinOperation={(index !== 0) ? query?.query?.queries?.at(index - 1)?.joinOperation : undefined} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )
                })}


            </div>
            {
                (newQueryField || query?.query?.queries?.length == 0) && (
                    <div className="accordion-container rounded-md border border-[#CCE3FD] mb-2 w-full">
                        <div className="accordion-header flex items-end  bg-[#F6FAFF] rounded-t-md cursor-pointer justify-between flex" onClick={() => toggleIsExpanded(-1)}>
                            <div></div>
                            <div className='flex my-auto text-[#66AAF9]'>
                                {!isExpanded.get(-1) ? <ExpandIcon /> : <RightChevronIcon />}
                            </div>
                        </div>
                        {!isExpanded.get(-1) && (
                            <div className='mb-4 mx-7'>
                                <AddQueryDropArea
                                    onDrop={(item) => handleDrop(-1, item)} />
                            </div>
                        )}
                    </div>
                )
            }
            {
                query?.query?.queries && query?.query?.queries.length > 0 && (
                    <div className='float-right'>
                        <Button className='m-1 bg-[#E6F1FE] text-[#006FEE]' onClick={clearAll}>Clear All</Button>
                        <Button className='ml-1 bg-[#E6F1FE] text-[#006FEE]' onClick={updateNewQuery}>New Query Field</Button>
                    </div>
                )
            }
        </>
    )
}
