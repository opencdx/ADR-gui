import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useQueryStore } from "@/lib/store";
import { DroppableTypes } from './droppable-types';
import { TinkarConceptModel } from '@/api/adr';

const hoverStyle: CSSProperties = {
  border: '1px solid #006FEE',
}

export interface UnitsDroppableProps {
  showCopyIcon?: boolean
  units: TinkarConceptModel
}

interface DropResult {
  criteria: string
}

export const UnitsDroppable: FC<UnitsDroppableProps> = ({ showCopyIcon, units }) => {
  const { addCriteriaToQuery } = useQueryStore();
  const query = useQueryStore((state) => state.query);
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.UNITS,
      item: { units },
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
      <div ref={drag} className='flex rounded-md border border-gray-200 bg-white p-3 w-11/12 h-auto items-start self-stretch gap-3 m-1 cursor-pointer w-[98%]' style={{ opacity, ...(isHovered ? hoverStyle : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {units.conceptName}
      </div>
    </>
  )
}