import React from 'react'
import { DrawnSegment } from '../../../types'
import { ValueBubble, MovableValueBubble } from './ValueBubble'
import './ResizeHandles.css'

interface ValueBubblesProps {
  segments: DrawnSegment[]
}

export const ValueBubbles = ({ segments }: ValueBubblesProps) => (
  <>
    {segments.map(({ id, x1, x2, y1, y2 }, i) => {
      const sloped = y1 !== y2
      return (
        <React.Fragment key={id}>
          {sloped ? <ValueBubble x={x1} y={y1} /> : null}
          {sloped ? null : <ValueBubble x={x1 + (x2 - x1) / 2} y={y1} />}
          {sloped ? <ValueBubble x={x2} y={y2} /> : null}
        </React.Fragment>
      )
    })}
  </>
)

interface VerticalResizeHandlesProps {
  segments: DrawnSegment[]
  setCornerMovingId: (corner: [number, number]) => void
  setYMovingId: (id: number) => void
  isDrawing: boolean
}

export const VerticalResizeBubbles = ({
  segments,
  setCornerMovingId,
  setYMovingId,
  isDrawing,
}: VerticalResizeHandlesProps) => {
  return (
    <>
      {segments.map(({ id, x1, x2, y1, y2 }, i) => {
        // don't create grab handles on segment currently being drawn
        if (isDrawing && i === segments.length - 1) {
          return null
        }
        const sloped = y1 !== y2
        const cornerClass = 'ResizeCornerHandle' + (sloped ? ' visible' : '')
        return (
          <React.Fragment key={id}>
            <MovableValueBubble
              className={cornerClass}
              onMouseDown={() => setCornerMovingId([id, 1])}
              x={x1}
              y={y1}
            />
            {sloped ? null : (
              <MovableValueBubble
                className="ResizeVerticalHandle"
                onMouseDown={() => setYMovingId(id)}
                x={x1 + (x2 - x1) / 2}
                y={y1}
              />
            )}
            <MovableValueBubble
              className={cornerClass}
              onMouseDown={() => setCornerMovingId([id, 2])}
              x={x2}
              y={y2}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
