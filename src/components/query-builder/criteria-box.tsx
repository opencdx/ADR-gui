import { useState, type CSSProperties, type FC } from 'react'
import { useDrag } from 'react-dnd'

import { useCriteriaStore } from "@/lib/store";
import { CriteriaTypes } from './criteria-types';

const style: CSSProperties = {
    display: 'flex',
    borderRadius: '8px',
    border: '1px solid #E4E4E7',
    background: '#FFF',
    padding: '12px 16px',
    minHeight: '54px',
    minWidth: '237px',
    height: 'auto',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: '12px',
    margin: '3px',
    cursor: 'pointer',
}

const hoverStyle: CSSProperties = {
  border: '1px solid #006FEE',
}

export interface CriteriaBoxProps {
  showCopyIcon?: boolean
  criteria: string
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
      <div ref={drag} style={{ ...style, opacity, ...(isHovered ? hoverStyle : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {criteria}
      </div>
    </>
  )
}