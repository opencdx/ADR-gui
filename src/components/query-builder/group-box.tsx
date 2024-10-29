import { Query } from "@/api/adr";
import { JoinOperation, Operation } from '@/api/adr/model/query';
import { useQueryStore } from '@/lib/store';
import React, { FC, memo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DeleteIcon, ExpandIcon, CollapseIcon } from 'ui-library';
import { AddQueryDropArea } from './drop-area/add-query-drop-area';
import { QueryDropArea } from './drop-area/query-drop-area';
import { FormulaBox } from './formula-box';
import { JoinOperationBox } from './join-operation-box';
import { OperandTypes } from './operand-types';

interface GroupBoxProps {
    onDrop: (item: any) => void;
    group: Array<Query>;
    parentGroupIndex: number[];
    query: Query;
    index: number;
    groupIndex?: number[];
    depth?: number;
    joinOperation?: JoinOperation;
}

export const GroupBox: FC<GroupBoxProps> = memo(function GroupBox({
    onDrop, group, parentGroupIndex, index, groupIndex, depth, joinOperation
}) {

    const [isExpanded, setIsExpanded] = useState(true);
    const { addJoinOperationToQueryGroup, addFormulaToQueryGroup, addCriteraToQueryGroup, addOperationToQueryGroup, addGroupToQueryGroup, addGroupCriteraToQueryGroup, addGroupOperationToQueryGroup, addGroupJoinOperationToQueryGroup, addGroupFormulaToQueryGroup, removeFromQueryGroupSection } = useQueryStore();

    const [, drop] = useDrop({
        accept: 'QUERY_ITEM',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    function isOperation(value: unknown): value is Operation {
        return Object.values(Operation).includes(value as Operation);
    }
    const handleDrop = (index: number, item: any, depth: number, groupIndex: number[]) => {
        if (item.criteria) {
            if (groupIndex.length > 0) {
                addGroupCriteraToQueryGroup(index, item.criteria, groupIndex[0], depth);
            } else {
                addCriteraToQueryGroup(index, item.criteria);
            }
        } else if (item.operation && isOperation(item.operation)) {
            if (groupIndex.length > 0) {
                addGroupOperationToQueryGroup(index, item.operation, groupIndex[0], depth);
            } else {
                addOperationToQueryGroup(index, item.operation, depth);
            }
        } else if (item.joinOperation) {
            if (groupIndex.length > 0) {
                addGroupJoinOperationToQueryGroup(index, item.joinOperation, groupIndex[0], depth);
            } else {
                addJoinOperationToQueryGroup(index, item.joinOperation);
            }
        } else if (item.formula) {
            if (groupIndex.length > 0) {
                addGroupFormulaToQueryGroup(index, groupIndex[0]);
            } else {
                addFormulaToQueryGroup(index, item.formula);
            }
        } else if (item.group) {
            addGroupToQueryGroup(index);
        }
    }

    const renderQueryItem = (index: number, item: Query, groupIndex: number, parentGroupIndex: number[], group: Array<Query>) => {
        return (
            <React.Fragment key={groupIndex}>
                {((item.concept && groupIndex === 0)
                    || (item.concept && !group.at(groupIndex - 1)?.joinOperation)) && (
                        <div className="flex items-center w-full">
                            <div className={`w-[2px] ${groupIndex === 0 ? 'h-[35px] mt-[33px]' :
                                groupIndex === group.length - 1 ? 'h-[35px] mb-[32px] bg-[#66AAF9]' :
                                    'h-[65px] bg-[#66AAF9]'
                                } ${(groupIndex === 0 && group.length > 1) ? 'bg-[#66AAF9]' : ''}`} />

                            <div className="w-3 h-[2px] bg-[#66AAF9]" />
                            <div className="w-full mr-3">
                                <QueryDropArea
                                    onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                    query={item}
                                    index={index}
                                    key={index}
                                    depth={groupIndex}
                                    groupIndex={[...parentGroupIndex, groupIndex]} />
                            </div>
                        </div>

                    )}
                {item.joinOperation &&
                    !(group.at(groupIndex + 1) && group.at(groupIndex + 1)?.group) && (
                        <div className=" flex items-center">
                            {!group.at(groupIndex + 2) &&
                                <div className='w-[2px] h-[33px] mb-[31px] bg-[#66AAF9]' />
                            }
                            {group.at(groupIndex + 2) &&
                                <div className='w-[2px] h-[65px] bg-[#66AAF9]' />
                            }
                            <div className="w-3 h-[2px] bg-[#66AAF9]" />
                            <JoinOperationBox joinOperation={item.joinOperation} index={index} key={index} groupIndex={[...parentGroupIndex, groupIndex + 1]} depth={groupIndex} />
                            {group.at(groupIndex + 1) && group.at(groupIndex + 1)?.concept &&
                                (
                                    <div className="flex items-center w-full">
                                        <div className="w-3 h-[2px] bg-[#66AAF9]" />
                                        <div className="w-full mr-3">
                                            <QueryDropArea
                                                onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                                query={group.at(groupIndex + 1)!}
                                                index={index}
                                                key={index}
                                                depth={groupIndex + 1}
                                                groupIndex={[...parentGroupIndex, groupIndex + 1]} />
                                        </div>
                                    </div>

                                )}
                            {group.at(groupIndex + 1) && group.at(groupIndex + 1)?.formula && (
                                <div className="flex items-center w-full">
                                    <div className="w-3 h-[2px] bg-[#66AAF9]" />
                                    <div className="w-full mr-3">
                                        <FormulaBox onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                            formula={group.at(groupIndex + 1)?.formula!}
                                            query={item}
                                            index={index}
                                            parents={[OperandTypes.FORMULA]}
                                            key={index}
                                            groupIndex={[...parentGroupIndex, groupIndex + 1]}
                                            depth={groupIndex + 1} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                {((item.formula && groupIndex === 0)
                    || (item.formula && !group.at(groupIndex - 1)?.joinOperation)) && (
                        <div className="flex items-center w-full">
                            <div className={`w-[2px] ${groupIndex === 0 ? 'h-[35px] mt-[33px]' :
                                groupIndex === group.length - 1 ? 'h-[35px] mb-[32px] bg-[#66AAF9]' :
                                    'h-[65px] bg-[#66AAF9]'
                                } ${(groupIndex === 0 && group.length > 1) ? 'bg-[#66AAF9]' : ''}`} />

                            <div className="w-3 h-[2px] bg-[#66AAF9] " />
                            <div className="w-full mr-3">
                                <FormulaBox onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                    formula={item.formula}
                                    query={item}
                                    index={index}
                                    parents={[OperandTypes.FORMULA]}
                                    key={index}
                                    groupIndex={[...parentGroupIndex, groupIndex]}
                                    depth={groupIndex} />
                            </div>
                        </div>

                    )}
                {item.group && (
                    <GroupBox
                        onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                        group={item.group}
                        parentGroupIndex={[...parentGroupIndex, groupIndex]}
                        query={item}
                        index={index}
                        key={index}
                        groupIndex={[...parentGroupIndex, groupIndex]}
                        depth={groupIndex}
                        joinOperation={group.at(groupIndex - 1)?.joinOperation}
                    />
                )}

            </React.Fragment>
        )
    }
    const handleRemove = (
        index: number,
    ) => {
        removeFromQueryGroupSection(index, groupIndex || []);
    }

    return (
        <div ref={drop}>
            {joinOperation && groupIndex && (
                <div className="py-6 pl-40">
                    <div className="ml-5 mt-[-15px] w-[120px]">
                        <JoinOperationBox joinOperation={joinOperation} index={index - 1} key={index - 1} />
                    </div>
                </div>
            )}
            <div className="accordion-container rounded-md border border-[#CCE3FD] mb-2 w-full">
                <div className={`accordion-header ${groupIndex ? 'bg-[#CCE3FD]' : 'bg-[#E6F1FE]'} pl-2 py-2 rounded-t-md cursor-pointer`} onClick={() => setIsExpanded(!isExpanded)}>
                    <div className='flex justify-end text-[#66AAF9]'>
                        <div className='flex cursor-pointer mr-5' onClick={() => handleRemove(index)}>
                            <DeleteIcon />
                        </div>
                        <div>
                            {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
                        </div>
                    </div>
                    {joinOperation && !groupIndex && (
                        <div className="ml-5 mt-[-15px] w-[120px]">
                            <JoinOperationBox joinOperation={joinOperation} index={index - 1} key={index - 1} />
                        </div>
                    )}
                </div>
                {isExpanded && (
                    <div className={`accordion-content ${groupIndex ? 'bg-[#CCE3FD]' : 'bg-[#F6FAFF]'} p-4 rounded-b-md border-t ${groupIndex ? 'border-none' : 'border-blue-200'} w-full`}>
                        {group.map((item, groupIndex) => renderQueryItem(index, item, groupIndex, parentGroupIndex, group))}
                        <div className='flex items-center'>
                            <div className='w-full mt-2 mx-3'>
                                <AddQueryDropArea onDrop={(item) => handleDrop(index, item, group.length, parentGroupIndex)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
});

export default GroupBox;
