import { useState, type CSSProperties } from 'react';
import { useDrag } from 'react-dnd';

import { Focus } from '@/api/adr';
import { useQueryStore } from "@/lib/store";
import { Button, Dropdown, DropdownItem, DropdownSection, DropdownTrigger } from 'ui-library';
import DropdownMenu from 'ui-library/dropdown/dropdown-menu';
import { DownArrow, UpArrow } from '../../icons';
import { DroppableTypes } from '../droppable-types';
import { FocusBox } from './focus-droppable';

const hoverStyle: CSSProperties = {
    border: '1px solid #006FEE',
}

interface DropResult {
    operator: string
}

export default function FocusDropdown() {
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
                    <Button className='w-[250px] h-8 px-3 justify-start items-center gap-3 shrink-0 mr-2.5'>
                        <div className='w-full justify-between flex items-center'>
                            + Focus
                            <div className='my-auto'>
                                <div className='float-right flex items-center'>
                                    {isOpen && <UpArrow />}
                                    {!isOpen && <DownArrow />}
                                </div>
                            </div>
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className='w-[250px] rounded-none p-0'>
                    <DropdownSection className='rounded-none'>
                        <DropdownItem isReadOnly className='p-0 rounded-none mt-2'>
                            <FocusBox focus={Focus.Self} display='Self' />
                            <FocusBox focus={Focus.Descendants} display='Descendants' />
                            <FocusBox focus={Focus.DescendantsOrSelf} display='Descendants or Self' />
                            <FocusBox focus={Focus.ChildrenOrSelf} display='Child or Self' />
                            <FocusBox focus={Focus.Children} display='Child' />
                            <FocusBox focus={Focus.Ancestors} display='Ancestors' />
                            <FocusBox focus={Focus.AncestorsOrSelf} display='Ancestors or Self' />
                            <FocusBox focus={Focus.Parent} display='Parent' />
                            <FocusBox focus={Focus.ParentOrSelf} display='Parent or Self' />
                            <FocusBox focus={Focus.Member} display='Member' />
                            <FocusBox focus={Focus.Date} display='Date' />
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}