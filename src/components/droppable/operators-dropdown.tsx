import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';
import { Button, Dropdown, DropdownItem, DropdownSection, DropdownTrigger } from 'ui-library';
import DropdownMenu from 'ui-library/dropdown/dropdown-menu';
import { OperationQueryBox } from './operation-query-droppable';
import { Operation as QueryOperation } from '@/api/adr/model/query';
import { Operation as FormulaOperation } from '@/api/adr/model/formula';
import { DownArrow, UpArrow } from '../icons';
import { OperationFormulaBox } from './operation-formula-droppable';

const hoverStyle: CSSProperties = {
    border: '1px solid #006FEE',
}

interface DropResult {
    operator: string
}

export default function OperatorsDropdown() {
    const { addCriteriaToQuery } = useQueryStore();
    const query = useQueryStore((state) => state.query);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: DroppableTypes.OPERATOR,
            options: {
                dropEffect: 'move',
            },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.2 : 1,
            }),
        }),
        [],
    )

    const handleOpenChange = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };

    return (
        <>
            <Dropdown isOpen={isOpen} onOpenChange={handleOpenChange} classNames={{ content: ['rounded-none', 'p-0'] }}>
                <DropdownTrigger>
                    <Button className='w-[300px] h-8 px-3 justify-start items-center gap-3 shrink-0 '>
                        <div className='w-full justify-between flex items-center'>
                            + Operators
                            <div className='my-auto'>
                                <div className='float-right flex items-center'>
                                    {isOpen && <UpArrow />}
                                    {!isOpen && <DownArrow />}
                                </div>
                            </div>
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className='w-[300px] rounded-none p-0'>
                    <DropdownSection className='rounded-none'>
                        <DropdownItem isReadOnly className='p-0 rounded-none mt-2'>
                            <OperationQueryBox operation={QueryOperation.Equal} display='= Equal' />
                            <OperationQueryBox operation={QueryOperation.NotEqual} display='!= Not Equal' />
                            <OperationQueryBox operation={QueryOperation.GreaterThan} display='> Greater than' />
                            <OperationQueryBox operation={QueryOperation.GreaterThanOrEqual} display='>= Greater than or equal to' />
                            <OperationQueryBox operation={QueryOperation.LessThan} display='< Less than' />
                            <OperationQueryBox operation={QueryOperation.LessThanOrEqual} display='<= Less than or equal to' />
                            <OperationFormulaBox operation={FormulaOperation.Add} display='+ Addition' />
                            <OperationFormulaBox operation={FormulaOperation.Subtract} display='- Subtraction' />
                            <OperationFormulaBox operation={FormulaOperation.Multiply} display='&#215; Multiplication' />
                            <OperationFormulaBox operation={FormulaOperation.Divide} display='&#247; Division' />
                            <OperationFormulaBox operation={FormulaOperation.Power} display='^ Power' />
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}