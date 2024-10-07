import { useState, type CSSProperties, type FC } from 'react';
import { useDrag } from 'react-dnd';

import { Operation } from '@/api/adr/model/formula';
import { AddIcon } from 'ui-library';
import { DroppableTypes } from '../droppable-types';

const hoverStyle: CSSProperties = {
  border: '1px solid #006FEE',
}

export interface OperationFormulaBoxProps {
  showCopyIcon?: boolean
  operation: Operation
  display: string
}

export const OperationFormulaBox: FC<OperationFormulaBoxProps> = ({ showCopyIcon, operation, display }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: DroppableTypes.ARITHMETIC_OPERATOR,
      item: { operation },
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
      <div ref={drag} className='flex rounded-none border-none bg-white w-auto h-[32px] items-center self-stretch gap-3 m-0 cursor-pointer font-medium' style={{ opacity, ...(isHovered ? hoverStyle : {}) }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className='text-blue-500 ml-3'><AddIcon /></span> {display}
      </div>
    </>
  )
}