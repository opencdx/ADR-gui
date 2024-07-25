import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'

import { useCriteriaStore } from "@/lib/store";
import { CriteriaTypes } from './criteria-types';

const style: CSSProperties = {
    display: 'flex',
    border: '1px dashed gray',
    padding: '0.5rem',
    margin: '0.5rem',
}

export interface CriteriaBoxProps {
  showCopyIcon?: boolean
  criteria: string
  isChild?: boolean
}

interface DropResult {
  criteria: string
}

export const CriteriaBox: FC<CriteriaBoxProps> = ({ showCopyIcon, criteria, isChild }) => {
  const { addCriteria } = useCriteriaStore();
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
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [showCopyIcon],
  )

  return (
    <>
      {!isChild &&
        <div ref={drag} style={{ ...style, opacity, cursor: "pointer" }}>
          <span class="material-symbols-outlined" style={{color: "#0066FF", paddingRight: "12px"}}>add</span> {criteria}
        </div>
      }
      {isChild &&
        <div ref={drag} style={{ ...style, opacity, cursor: "pointer" }}>
          <span class="material-symbols-outlined" style={{color: "#0066FF", paddingRight: "12px", paddingLeft: "20px"}}>add</span> {criteria}
        </div>
      }
    </>
  )
}