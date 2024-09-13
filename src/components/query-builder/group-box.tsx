import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Query } from "@/api/adr";
import { QueryDropArea } from './query-drop-area';
import { JoinOperationBox } from './join-operation-box';
import { useQueryStore } from '@/lib/store';
import { memo, FC } from 'react';
import { AddQueryDropArea } from './add-query-drop-area';
import { Operation } from '@/api/adr/model/query';
import { FormulaBox } from './formula-box';
import { OperandTypes } from './operand-types';
interface GroupBoxProps {
    onDrop: (item: any) => void;
    group: Array<Query>;
    query: Query;
    index: number;
}

export const GroupBox: FC<GroupBoxProps> = memo(function GroupBox({
    onDrop, group, query, index
}) {

    console.log(query)
    const [isExpanded, setIsExpanded] = useState(true);
    const { addJoinOperationToQueryGroup, addFormulaToQueryGroup, addGroupToQuery, addCriteraToQueryGroup, addOperationToQueryGroup } = useQueryStore();

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
            addCriteraToQueryGroup(index, item.criteria, "concept");
        } else if (item.operation && isOperation(item.operation)) {
            addOperationToQueryGroup(index, item.operation, depth);
        } else if (item.joinOperation) {
            addJoinOperationToQueryGroup(index, item.joinOperation);
        } else if (item.formula) {
            addFormulaToQueryGroup(index, item.formula);
        } else if (item.group) {
            addGroupToQuery();
        }
    }

    const renderQueryItem = (item: Query, depth: number = 0) => {

        return (
            <React.Fragment>
                {item.concept && (
                    <div className="flex items-center w-full ">
                        <div className={`w-[2px] bg-blue-200 ${depth === 0 ? 'h-[50px] mt-12' :
                            depth === group.length - 1 ? 'h-[50px] mb-12' :
                                'h-[65px]'
                            }`}></div>

                        <div className="w-4 h-[2px] bg-blue-200 "></div>
                        <div className="w-full">
                            <QueryDropArea
                                onDrop={(item1) => handleDrop(index, item1, depth)}
                                query={item}
                                index={index}
                                key={index} />
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
                    <FormulaBox onDrop={(item) => handleDrop(index, item, depth)}
                        formula={item.formula}
                        query={item}
                        index={index}
                        parents={[OperandTypes.FORMULA]}
                        key={index}
                        groupIndex={depth} />
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
                        {group.map(renderQueryItem)}
                        <div className='flex items-center'>
                            <div className='w-full'>
                                <AddQueryDropArea onDrop={(item) => handleDrop(index, item, group.length)} />
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
});

export default GroupBox;
