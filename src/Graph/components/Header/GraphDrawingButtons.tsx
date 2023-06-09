import { Stack, Tooltip, IconButton } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckIcon from '@mui/icons-material/Check'
import CompareIcon from '@mui/icons-material/Compare'
import EditIcon from '@mui/icons-material/Edit'
import { Preferences } from '../../../types'
import { MAX_AGENTS, margin } from '../../graphConstants'
import { ExtraOptions } from './ExtraOptions'

const ButtonText = ({ children }) => (
  <Stack
    alignItems="center"
    sx={{ fontSize: 12, textTransform: 'uppercase', minWidth: 40 }}
  >
    {children}
  </Stack>
)

interface GraphDrawingButtonsProps {
  isComplete: boolean
  totalAgents: number
  onClickDone: VoidFunction
  onClickCreateAgent: VoidFunction
  onClickCompare: VoidFunction
  compareMode: boolean
  preferences: Preferences
  setNewData: (pref: Preferences) => void
}

export const GraphDrawingButtons = ({
  onClickDone,
  onClickCreateAgent,
  onClickCompare,
  totalAgents,
  compareMode,
  isComplete,
  preferences,
  setNewData,
}: GraphDrawingButtonsProps) => {
  const cantAddMoreAgents = totalAgents === MAX_AGENTS

  return (
    <>
      <Tooltip
        title={
          cantAddMoreAgents
            ? `This tool supports up to ${MAX_AGENTS} people`
            : 'Add Person'
        }
      >
        <span>
          <IconButton
            aria-label="add person"
            disabled={!isComplete || cantAddMoreAgents}
            onClick={() => {
              if (compareMode) {
                onClickCompare()
              }
              onClickCreateAgent()
            }}
          >
            <ButtonText>
              <PersonAddIcon />
              Add Person
            </ButtonText>
          </IconButton>
        </span>
      </Tooltip>

      <IconButton
        aria-label={compareMode ? 'Edit' : 'Compare'}
        disabled={!isComplete || totalAgents < 2}
        onClick={onClickCompare}
      >
        <ButtonText>
          {compareMode ? <EditIcon /> : <CompareIcon />}
          {compareMode ? 'Edit' : 'Compare'}
        </ButtonText>
      </IconButton>

      <IconButton
        aria-label={'Done'}
        disabled={!isComplete || totalAgents < 2}
        onClick={onClickDone}
      >
        <ButtonText>
          <CheckIcon />
          Done
        </ButtonText>
      </IconButton>

      <ExtraOptions setNewData={setNewData} preferences={preferences} />
    </>
  )
}
