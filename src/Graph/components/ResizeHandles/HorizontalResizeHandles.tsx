import { useContext } from 'react'
import { DrawnSegment } from '../../../types'
import { GraphContext } from '../../GraphContext'
import { getInnerHeight } from '../../graphConstants'
import './ResizeHandles.css'

interface HorizontalResizeHandlesProps {
  segments: DrawnSegment[]
  setXMovingId: (id: number) => void
  isDrawing: boolean
}

export const HorizontalResizeHandles = ({
  segments,
  setXMovingId,
  isDrawing,
}: HorizontalResizeHandlesProps) => {
  const { height } = useContext(GraphContext)
  return (
    <>
      {segments.map((seg, i) => {
        if (isDrawing && i === segments.length - 1) {
          return null
        } else {
          const onMouseDown = () => setXMovingId(seg.id)
          return (
            <line
              tabIndex={0}
              className={'ResizeHorizontalHandle'}
              key={seg.id}
              x1={seg.x2}
              x2={seg.x2}
              y1={getInnerHeight(height)}
              y2={0}
              onMouseDown={onMouseDown}
              onFocus={onMouseDown}
            />
          )
        }
      })}
    </>
  )
}
