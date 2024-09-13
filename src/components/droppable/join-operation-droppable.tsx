import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { DroppableTypes } from './droppable-types';
import { JoinOperation } from '@/api/adr';

const hoverStyle: CSSProperties = {

}

export interface JoinOperatorDroppableProps {
  showCopyIcon?: boolean
  joinOperation: JoinOperation
  display: string
}

export const JoinOperationDroppable: FC<JoinOperatorDroppableProps> = ({ showCopyIcon, joinOperation, display }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.JOIN_OPERATION,
      item: { joinOperation },
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
      <div ref={drag} className='cursor-pointer mr-3 rounded-md border-2 border-blue-500 inline-flex h-8 px-3 justify-center items-center gap-3 shrink-0 text-blue-500 font-medium' style={{ opacity, ...(isHovered ? hoverStyle : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className="material-symbols-outlined">add</span>
        {display}
      </div>
    </>
  )
}