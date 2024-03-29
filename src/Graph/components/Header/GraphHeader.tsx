import { ReactNode } from 'react'
import { Stack } from '@mui/material'
import { margin } from '../../graphConstants'

interface GraphHeaderProps {
  color: string
  heading: ReactNode
  buttons: ReactNode
  fullWidth?: boolean
}

export const GraphHeader = ({ color, heading, buttons, fullWidth }: GraphHeaderProps) => {
  return (
    <Stack
      marginLeft={fullWidth ? null : margin.left + 'px'}
      marginRight={fullWidth ? null :margin.right + 'px'}
      paddingY={1}
      paddingX={3}
      spacing={1}
      alignItems="center"
      direction="row"
      maxWidth="100%"
      justifyContent="space-between"
      gap={10}
      sx={{
        backgroundColor: color,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 70,
      }}
    >
      {heading}

      <Stack
        justifyContent="flex-end"
        alignItems="center"
        direction="row"
      >
        {buttons}
      </Stack>
    </Stack>
  )
}
