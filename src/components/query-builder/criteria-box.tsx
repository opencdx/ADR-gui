import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useCriteriaStore, useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';
import { Query } from '@/api/adr';

const hoverStyle: CSSProperties = {
  border: '1px solid #006FEE',
}

export interface CriteriaBoxProps {
  showCopyIcon?: boolean
  id: number | undefined
  conceptId: string | undefined
  conceptName: string | undefined
  conceptDescription: string | undefined
}

interface DropResult {
  criteria: string
}

export const CriteriaBox: FC<CriteriaBoxProps> = ({ showCopyIcon, id, conceptId, conceptName, conceptDescription }) => {
  const { addCriteria } = useCriteriaStore();
  const { query, updateQuery } = useQueryStore();
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.CRITERIA,
      item: { id, conceptId, conceptName, conceptDescription },
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          addCriteria(item.conceptName as string)
          query.query?.queries?.push({conceptId: item.conceptId});
          updateQuery(query);
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
      <div ref={drag} className='flex rounded-md border border-gray-200 bg-white p-3 w-11/12 h-auto items-start self-stretch gap-3 m-1 cursor-pointer w-[98%]' style={{ opacity, ...(isHovered ? hoverStyle : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {conceptName}
      </div>
    </>
  )
}