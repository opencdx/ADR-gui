import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useCriteriaStore } from "@/lib/store";
import { CriteriaTypes } from './criteria-types';

const hoverStyle: CSSProperties = {
  border: '1px solid #006FEE',
}

export interface CriteriaBoxProps {
  showCopyIcon?: boolean
  criteria: string | undefined
}

interface DropResult {
  criteria: string
}

export const CriteriaBox: FC<CriteriaBoxProps> = ({ showCopyIcon, criteria }) => {
  const { addCriteria } = useCriteriaStore();
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: CriteriaTypes.CRITERIA,
      item: { criteria },
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>()
        if (item && dropResult) {
          addCriteria(item.criteria as string)
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
        {criteria}
      </div>
    </>
  )
}