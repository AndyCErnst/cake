export const MAX_AGENTS = 3

// Spacing
export const defaultGraphWidth = 940
export const defaultGraphHeight = 420
// Unfortunately, the graph svg needs margin for labels and drawing things 
// a bit outside the normal graph area. We have to calculate for this in many places.
// `bottom` and `left` are large to allow for the labels.
export const margin = { top: 20, right: 18, bottom: 19, left: 60 }
export const yAxisLabelOffset = 30
export const getInnerHeight = (height: number) => height - margin.top - margin.bottom
export const getInnerWidth = (width: number) => width - margin.left - margin.right

export const tickOffset = 7
export const defaultCakeSize = 100

// Algorithms
export type AlgoName = 'cutAndChoose' | 'selfridgeConway'

export interface Algorithm {
  key: AlgoName
  name: string
  numAgentsText: string
  minAgents: number
  maxAgents: number
  shortDescription: string
  link: string
}

export const Algorithms: Record<AlgoName, Algorithm> = {
  cutAndChoose: {
    key: 'cutAndChoose',
    name: 'Divide and Choose',
    numAgentsText: '2 people',
    minAgents: 2,
    maxAgents: 2,
    shortDescription:
      'A simple method for envy-free division between two people. One divides, the other chooses.',
    link: 'https://en.wikipedia.org/wiki/Divide_and_choose',
  },
  selfridgeConway: {
    key: 'selfridgeConway',
    name: 'Selfridge Conway',
    numAgentsText: '3 people',
    minAgents: 3,
    maxAgents: 3,
    shortDescription:
      'A method for envy-free division between three people. Maximum of five cucts.',
    link: 'https://en.wikipedia.org/wiki/Selfridge%E2%80%93Conway_procedure',
  },
}
