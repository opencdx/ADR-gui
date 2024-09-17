import { Query } from "@/api/adr";
import { Operation } from '@/api/adr/model/query';
import { useQueryStore } from '@/lib/store';
import React, { FC, memo, useState } from 'react';
import { useDrop } from 'react-dnd';
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
}

export const GroupBox: FC<GroupBoxProps> = memo(function GroupBox({
    onDrop, group, parentGroupIndex, index
}) {

    const [isExpanded, setIsExpanded] = useState(true);
    const { addJoinOperationToQueryGroup, addFormulaToQueryGroup, addCriteraToQueryGroup, addOperationToQueryGroup, addGroupToQueryGroup, addSubGroupToQueryGroup, addGroupCriteraToQueryGroup, addGroupOperationToQueryGroup, addGroupJoinOperationToQueryGroup, addGroupFormulaToQueryGroup } = useQueryStore();

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

    const renderQueryItem = (index: number, item: Query, groupIndex: number, parentGroupIndex: number[]) => {
        return (
            <React.Fragment key={groupIndex}>
                {item.concept && (
                    <div className="flex items-center w-full ">
                        <div className={`w-[2px] bg-blue-200 ${groupIndex === 0 ? 'h-[50px] mt-12' :
                            groupIndex === group.length - 1 ? 'h-[50px] mb-12' :
                                'h-[65px]'
                            }`}></div>

                        <div className="w-4 h-[2px] bg-blue-200 "></div>
                        <div className="w-full">
                            <QueryDropArea
                                onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                query={item}
                                index={index}
                                key={index}
                                depth={groupIndex}
                                groupIndex={parentGroupIndex} />
                        </div>
                    </div>

                )}
                {item.joinOperation && (
                    <div className=" flex items-center">
                        <div className='w-[2px] h-[60px] bg-blue-200'></div>
                        <div className="w-4 h-[2px] bg-blue-200 "></div>
                        <JoinOperationBox joinOperation={item.joinOperation} index={index} key={index} />
                    </div>
                )}
                {item.formula && (

                    <div className="flex items-center w-full ">
                        <div className={`w-[2px] bg-blue-200 ${groupIndex === 0 ? 'h-[50px] mt-12' :
                            groupIndex === group.length - 1 ? 'h-[50px] mb-12' :
                                'h-[65px]'
                            }`}></div>

                        <div className="w-4 h-[2px] bg-blue-200 "></div>
                        <div className="w-full">
                            <FormulaBox onDrop={(item) => handleDrop(index, item, groupIndex, parentGroupIndex)}
                                formula={item.formula}
                                query={item}
                                index={index}
                                parents={[OperandTypes.FORMULA]}
                                key={index}
                                groupIndex={[...parentGroupIndex, groupIndex]} />
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
                    />
                )}

            </React.Fragment>
        )
    }

    return (
        <div ref={drop}>
            <div className="accordion-container rounded-md border border-[#CCE3FD] mb-2 w-full">
                <div className="accordion-header flex items-center  bg-[#CCE3FD]  p-2 rounded-t-md cursor-pointer justify-end" onClick={() => setIsExpanded(!isExpanded)}>
                    <span
                        className="material-symbols-outlined mr-2 text-blue-500 cursor-pointer"
                    >
                        {isExpanded ? 'expand_more' : 'chevron_right'}
                    </span>
                </div>
                {isExpanded && (
                    <div className="accordion-content bg-[#F6FAFF] p-4 rounded-b-md border-t border-blue-200 w-full">
                        {group.map((item, groupIndex) => renderQueryItem(index, item, groupIndex, parentGroupIndex))}

                        <div className='flex items-center'>
                            <div className='w-full'>
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
