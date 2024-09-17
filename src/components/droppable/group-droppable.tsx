

import { useState, type FC } from 'react'
import { useDrag } from 'react-dnd'
import { Query } from "@/api/adr";


import { DroppableTypes } from './droppable-types';

export interface GroupDroppableProps {
  showCopyIcon?: boolean,
  group: Array<Query>
}

export const GroupDroppable: FC<GroupDroppableProps> = ({ showCopyIcon, group }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.GROUP,
      item: { group },
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.2 : 1,
      }),
    }),
    [showCopyIcon],
  )

  return (
    <>
      <div ref={drag} className='cursor-pointer mr-3 rounded-md border-2 border-blue-500 inline-flex h-8 px-3 justify-center items-center gap-3 shrink-0 text-blue-500 font-medium' style={{ opacity }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className="material-symbols-outlined">add</span>
        Add Grouping
      </div>
    </>
  )
}