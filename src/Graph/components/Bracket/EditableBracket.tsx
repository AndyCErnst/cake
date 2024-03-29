import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { Segment } from '../../../types'
import { BracketContainer } from './BracketContainer'
import './EditableBracket.css'

interface EditableBracketProps {
  segment: Segment
  setSegmentWidth: (id: number, end: number) => void
  segNumber: number
}

export const EditableBracket = ({
  segment,
  setSegmentWidth,
  segNumber,
}: EditableBracketProps) => {
  const [editing, setEditing] = useState(false)
  const { start, end, id } = segment
  const slicesize = end - start
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setSegmentWidth(id, start)
    }
    const newSliceSize = parseInt(value)
    if (!isNaN(newSliceSize)) {
      setSegmentWidth(id, start + newSliceSize)
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      exitEditing()
    }
  }
  const exitEditing = () => setEditing(false)
  return (
    <BracketContainer focused={editing} segment={segment}>
      <Box
        sx={{
          maxWidth: '70px',
          backgroundColor: 'white',
          display: 'inline-block',
          marginTop: '5px',
        }}
      >
        {editing ? (
          <TextField
            label={`Part ${segNumber}`}
            type="number"
            autoFocus
            value={slicesize}
            // onBlur={exitEditing}
            onKeyDown={handleKeyPress}
            // this prevents clicks from also generating new sections.
            // scoping clicks to the right areas is a better solution than this
            onClick={(e) => e.stopPropagation()}
            onChange={onChange}
            variant="outlined"
            size="small"
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
            InputProps={{ className: 'Bracket_inputBox' }}
          />
        ) : (
          <Button
            onClick={() => setEditing(true)}
            variant="outlined"
            aria-label={`Segment ${segNumber} has width ${slicesize}%, click to edit`}
          >
            {slicesize} %
          </Button>
        )}
      </Box>
    </BracketContainer>
  )
}
