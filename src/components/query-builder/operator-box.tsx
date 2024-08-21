import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useCriteriaStore, useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';

const hoverStyle: CSSProperties = {
  
}

export interface OperatorBoxProps {
  showCopyIcon?: boolean
  operator: string | undefined
}

interface DropResult {
  criteria: string
}

export const OperatorBox: FC<OperatorBoxProps> = ({ showCopyIcon, operator }) => {
  const { addCriteria } = useCriteriaStore();
  const { query, updateQuery } = useQueryStore();
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.OPERATOR,
      item: { operator },
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          addCriteria(item.operator as string)
          //query.query?.queries?.push({conceptId: item.conceptId});
          //updateQuery(query);
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
        {operator}
      </div>
    </>
  )
}