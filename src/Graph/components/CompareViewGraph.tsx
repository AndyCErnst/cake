import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Stack, Tooltip } from '@mui/material'
import clamp from 'lodash.clamp'
import React, { useContext, useState } from 'react'
import { getAgentColor } from '../../colors'
import { Preferences, Segment } from '../../types'
import { GraphContext } from '../GraphContext'
import { getValueAtPoint } from '../algorithm/getValue'
import { getInnerHeight, getInnerWidth, margin } from '../graphConstants'
import { createScales, useConvertSegToPixels } from '../graphUtils'
import { AxisBottom, AxisLeft } from './Axes'
import { ValueBubbles } from './ResizeHandles'
import { ValueBubble } from './ResizeHandles/ValueBubble'
import { SectionLabels } from './SectionLabels'
import { Segments } from './Segments'

const graphHeight = 300
const graphWidth = 532 // just wide enough to display two side-by-side on desktop

interface CompareViewGraphProps {
  preferences: Preferences
  onClickEdit: (agent: number) => void
}

export const CompareViewGraph = ({ preferences, onClickEdit }: CompareViewGraphProps) => {
  const { labels, cakeSize } = useContext(GraphContext)
  const { yScale, xScale } = createScales({
    innerWidth: getInnerWidth(graphWidth),
    innerHeight: getInnerHeight(graphHeight),
    cakeSize,
  })

  const [mouseX, setMouseX] = useState<number | null>(0)

  const onMouseMove = (event: React.MouseEvent) => {
    const x = event.nativeEvent.offsetX - margin.left
    const constrainedX = clamp(x, 0, getInnerWidth(graphWidth))
    setMouseX(constrainedX)
  }
  const onMouseLeave = () => setMouseX(null)

  return (
    <Stack direction="row" flexWrap="wrap" spacing={1} marginTop={3}>
      {preferences.map((segments, i) => {
        return (
          <GraphContext.Provider
            key={i}
            value={{
              yScale,
              xScale,
              height: graphHeight,
              width: graphWidth,
              labels,
              cakeSize,
            }}
          >
            <SmallGraph
              segments={segments}
              agent={i}
              onMouseMove={onMouseMove}
              onClick={onMouseMove}
              onMouseLeave={onMouseLeave}
              x={mouseX}
              onClickEdit={onClickEdit}
            />
          </GraphContext.Provider>
        )
      })}
    </Stack>
  )
}

interface SmallGraphProps {
  segments: Segment[]
  agent: number
  onMouseMove: (event: React.MouseEvent) => void
  onClick: (event: React.MouseEvent) => void
  onMouseLeave: VoidFunction
  onClickEdit: (agent: number) => void
  x: number | null
}
export const SmallGraph = ({
  segments,
  agent,
  onMouseMove,
  onMouseLeave,
  onClick,
  onClickEdit,
  x,
}: SmallGraphProps) => {
  const { height, width, yScale, xScale } = useContext(GraphContext)
  const convertToPixels = useConvertSegToPixels()
  const pixelSegs = segments.map(convertToPixels)
  const comparisonLineValue = yScale(getValueAtPoint(segments, xScale.invert(x)))
  const hideComparisonBar = isNaN(comparisonLineValue)

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={'center'}
        alignItems="center"
        marginLeft={margin.left + 'px'}
      >
        <h3 style={{ margin: 0 }}>Person {agent + 1}</h3>
        <Tooltip title="Edit">
          <span>
            <IconButton
              aria-label={`Edit Person ${agent + 1}`}
              onClick={() => onClickEdit(agent)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {/* Track mouse to show comparison line. `onClick` is for touch users who have no move event */}
      <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick}>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <SectionLabels />

            <AxisBottom simple />
            <AxisLeft simple />

            <Segments key={agent} segments={pixelSegs} color={getAgentColor(agent)} />

            {hideComparisonBar ? (
              <ValueBubbles segments={pixelSegs} />
            ) : (
              <>
                <line y2={getInnerHeight(height)} x1={x} x2={x} stroke={'black'} />
                <ValueBubble x={x} y={comparisonLineValue} />
              </>
            )}
          </g>
        </svg>
      </div>
    </Stack>
  )
}
