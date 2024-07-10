import type { CSSProperties, FC } from 'react'
import { useDrag } from 'react-dnd'

import { CriteriaTypes } from './criteria-types'

const style: CSSProperties = {
    display: 'flex',
    border: '1px dashed gray',
    padding: '0.5rem',
    margin: '0.5rem',
}

export interface CriteriaBoxProps {
  showCopyIcon?: boolean
  criteria: string
}

export const CriteriaBox: FC<CriteriaBoxProps> = ({ showCopyIcon, criteria }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: criteria,
      options: {
        dropEffect: showCopyIcon ? 'copy' : 'move',
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [showCopyIcon],
  )

  return (
    <div ref={drag} style={{ ...style, opacity, cursor: "pointer" }}>
      <span class="material-symbols-outlined" style={{color: "#0066FF", paddingRight: "12px"}}>add</span> {criteria}
    </div>
  )
}