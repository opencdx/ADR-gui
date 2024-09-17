import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Query } from "@/api/adr";
import { QueryDropArea } from './drop-area/query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { useQueryStore } from '@/lib/store';
import { memo, FC } from 'react';
import { AddQueryDropArea } from './drop-area/add-query-drop-area';
import { Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';
import { OperandTypes } from './operand-types';
import { GroupBoxFirst } from './group-box-first';
interface GroupBoxProps {
    onDrop: (item: any) => void;
    group: Array<Query>;
    query: Query;
    index: number;
}

export const GroupBox: FC<GroupBoxProps> = memo(function GroupBox({
    onDrop, group, index
}) {

    const [isExpanded, setIsExpanded] = useState(true);
    const { addJoinOperationToQueryGroup, addFormulaToQueryGroup, addGroupToQuery, addCriteraToQueryGroup, addOperationToQueryGroup, addGroupToQueryGroup } = useQueryStore();

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
    const handleDrop = (index: number, item: any, depth: number) => {
        if (item.criteria) {
            addCriteraToQueryGroup(index, item.criteria);
        } else if (item.operation && isOperation(item.operation)) {
            addOperationToQueryGroup(index, item.operation, depth);
        } else if (item.joinOperation) {
            addJoinOperationToQueryGroup(index, item.joinOperation);
        } else if (item.formula) {
            addFormulaToQueryGroup(index, item.formula);
        } else if (item.group) {
            if (depth === 0) {
                addGroupToQuery();
            } else {
                addGroupToQueryGroup(index, item.group, depth);
            }
        }
    }

    const renderQueryItem = (index: number, item: Query, groupIndex: number = 0) => {
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
                                onDrop={(item1) => handleDrop(index, item1, groupIndex)}
                                query={item}
                                index={index}
                                key={index}
                                groupIndex={groupIndex} />
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
                            <FormulaBox onDrop={(item) => handleDrop(index, item, groupIndex)}
                                formula={item.formula}
                                query={item}
                                index={index}
                                parents={[OperandTypes.FORMULA]}
                                key={index}
                                groupIndex={groupIndex} />
                        </div>
                    </div>

                )}
                {item.group && (
                    <GroupBoxFirst
                        onDrop={(item) => handleDrop(index, item, groupIndex)}
                        group={item.group}
                        query={item}
                        index={index}
                        key={index}
                        groupIndex1={group.length}
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
                        {group.map((item, groupIndex) => renderQueryItem(index, item, groupIndex))}

                        <div className='flex items-center'>
                            <div className='w-full'>
                                <AddQueryDropArea onDrop={(item) => handleDrop(index, item, group.length + 1)} />
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
});

export default GroupBox;
