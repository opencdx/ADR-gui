import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';
import { Button, Dropdown, DropdownItem, DropdownSection, DropdownTrigger } from 'ui-library';
import DropdownMenu from 'ui-library/dropdown/dropdown-menu';
import { OperationBox } from './operation-droppable';
import { Operation } from '@/api/adr/model/query';
import { DownArrow, UpArrow } from '../icons';

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
                            <OperationBox operation={Operation.Equal} display='= Equal' />
                            <OperationBox operation={Operation.NotEqual} display='!= Not Equal' />
                            <OperationBox operation={Operation.GreaterThan} display='> Greater than' />
                            <OperationBox operation={Operation.GreaterThanOrEqual} display='>= Greater than or equal to' />
                            <OperationBox operation={Operation.LessThan} display='< Less than' />
                            <OperationBox operation={Operation.LessThanOrEqual} display='<= Less than or equal to' />
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}