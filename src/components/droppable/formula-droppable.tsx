import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';

const hoverStyle: CSSProperties = {

}

export interface FormulaDroppableProps {
  showCopyIcon?: boolean
}

interface DropResult {
  criteria: string
}

export const FormulaDroppable: FC<FormulaDroppableProps> = ({ showCopyIcon }) => {
  const { addFormulaToQuery } = useQueryStore();
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.FORMULA,
      item: { },
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          addFormulaToQuery();
        }
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
        Formula
      </div>
    </>
  )
}