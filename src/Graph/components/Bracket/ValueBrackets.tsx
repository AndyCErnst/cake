import React from 'react'
import { Box } from '@mui/material'
import { margin } from '../../graphConstants'
import { Segment } from '../../../types'
import { EditableBracket } from './EditableBracket'
import { BracketContainer } from './BracketContainer'

const styles = {
  position: 'relative',
  left: margin.left,
  width: 0, // doesn't matter as everything is pos absolute inside of it.
  height: 62,
}

interface ValueBracketsProps {
  segments: Segment[]
}

export const ValueBrackets = ({ segments }: ValueBracketsProps) => {
  return (
    <Box sx={styles}>
      {segments.map((seg, i) => (
        <BracketContainer focused={false} segment={seg} key={i}>
          {seg.end - seg.start} %
        </BracketContainer>
      ))}
    </Box>
  )
}

interface EditableValueBracketsProps {
  segments: Segment[]
  setSegmentWidth?: (id: number, innerWidth: number) => void
}

export const EditableValueBrackets = ({
  segments,
  setSegmentWidth,
}: EditableValueBracketsProps) => {
  return (
    <Box sx={styles}>
      {segments.map((seg, i) => (
        <EditableBracket
          segment={seg}
          key={seg.id}
          segNumber={i + 1}
          setSegmentWidth={setSegmentWidth}
        />
      ))}
    </Box>
  )
}
