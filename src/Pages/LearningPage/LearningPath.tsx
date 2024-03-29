import { Box, Stack, Tooltip } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'

import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { GraphContext } from '../../Graph/GraphContext'
import { ResultsSteps } from '../../Graph/components/ResultsView/ResultsSteps'
import { createScales } from '../../Graph/graphUtils'
import { sample3PersonResults, sampleLabels3Flavor } from '../../Graph/sampleData'
import { InteractionContainer } from '../../Layouts'
import { ButtonLink, Link } from '../../components/Link'
import akiThinking from '../../images/aki thinking.png'
import toolExample from '../../images/intro/corner.png'
import cake3PrefAki from '../../images/selfridge/aki.png'
import cake3PrefBruno from '../../images/selfridge/bruno.png'
import cake3PrefChloe from '../../images/selfridge/chloe.png'
import selfridgeResults from '../../images/selfridge/selfridge results.png'
import simple3Results from '../../images/selfridge/simple results.png'
import { CakeFlavor, CakeImage, CharacterImage, ImageContainer } from './Images'
import { MeasuringStep } from './MeasuringStep'
import { Info, Action } from './Aside'

interface CommonProps {
  preferredFlavor: CakeFlavor | null
  setPreferredFlavor: (flavor: CakeFlavor) => void
}

export const LearningPath = () => {
  const { step } = useParams()

  // scroll to top when navigating between steps
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/learn') {
      // scroll to top on initial load
      window.scrollTo(0, 0)
    } else {
      // otherwise scroll to container
      document.getElementById('container')?.scrollIntoView()
    }
  }, [pathname])

  const [preferredFlavor, setPreferredFlavor] = useState<CakeFlavor | undefined>(
    undefined
  )

  let stepNum = Number(step)
  if (isNaN(stepNum) || stepNum < 1) {
    stepNum = 1
  }

  const stepProps: CommonProps = { preferredFlavor, setPreferredFlavor }

  const steps: [any, string][] = [
    [null, ''], // step 0
    [WhatLearn, "What You'll Learn"],
    [FairDivision, 'Fair Division'],
    [SimpleCakeDivision, 'Simple Cake Division'],
    [MeaningOfFair, 'Meaning of Fair'],
    [TwoFlavorCake, '2-Flavor Cake'],
    [BetterThanHalf, 'Better Than Half'],
    [CutAndChoose, 'Cut and Choose'],
    [Clarification, 'Clarification'],
    [MeasuringStep, 'Measuring Preference'],
    [Recap1, 'Recap'],
    [EnterPlayer3, 'Enter Player 3'],
    [EnvyFree, 'Envy Free'],
    [SelfridgeConway, 'The Selfridge-Conway Method'],
    [ThreeWayDivision, '3-Way Division'],
    [Recap2, 'Final Recap'],
    [Ending, 'End'],
  ]
  const [CurrentStep] = steps[stepNum]
  return (
    <InteractionContainer
      id="container"
      minHeight={600}
      display="flex"
      flexDirection="column"
      sx={{
        '& p, & dt, & dd,& ol,& ul': {
          fontSize: 18,
        },
      }}
    >
      <Box flexGrow={1}>
        <CurrentStep {...stepProps} />
      </Box>
      <Box
        marginTop={4}
        display="grid"
        gridTemplateColumns={{ xs: '50% 50%', sm: '1fr 4fr 1fr' }}
        alignItems="center"
        justifyItems="center"
      >
        {/* The buttons are physically next to each other for better accessibility, but switched using CSS */}
        <Box order={1}>
          {stepNum <= 1 ? null : (
            <ButtonLink
              variant="outlined"
              href={'/learn/' + (stepNum - 1)}
              sx={{ justifySelf: 'flex-start' }}
            >
              <ArrowBackIcon fontSize="small" />
              Previous
            </ButtonLink>
          )}
        </Box>
        <Box order={{ xs: 2, sm: 3 }}>
          {stepNum >= steps.length - 1 ? null : (
            <ButtonLink
              variant="contained"
              href={'/learn/' + (stepNum + 1)}
              sx={{ justifySelf: 'flex-end' }}
            >
              Next
              <ArrowForwardIcon fontSize="small" />
            </ButtonLink>
          )}
        </Box>
        <Stack
          order={2}
          direction="row"
          spacing={1}
          justifySelf="center"
          component="ol"
          margin={0}
          padding={0}
          sx={{ listStyle: 'none', display: { xs: 'none', sm: 'flex' } }}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          paddingX={2}
        >
          {steps.map(([_, stepName], i) => {
            const current = stepNum === i
            return i === 0 ? null : (
              <Tooltip title={stepName} key={i}>
                <li style={{ margin: 0 }}>
                  <Link
                    href={`/learn/${i}`}
                    aria-label={current ? 'Current page' : `Go to ${stepName}`}
                    // wrapping the navigation circle like this creates a larger click target
                    sx={{
                      display: 'block',
                      padding: '6px',
                      ':hover>div,:focus>div': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'block',
                        borderRadius: '50%',
                        backgroundColor: (theme) =>
                          current ? theme.palette.secondary.main : '#666',
                        height: 12,
                        width: 12,
                      }}
                    />
                  </Link>
                </li>
              </Tooltip>
            )
          })}
        </Stack>
      </Box>
    </InteractionContainer>
  )
}


const WhatLearn = () => (
  <>
    <h2>Fair Division Interactive Course</h2>
    <p>Time: about 15 minutes</p>

    <Stack direction={{ xs: 'column', md: 'row' }} alignItems="flex-start">
      <div>
        <h3>What you'll learn</h3>
        <ol>
          <li>What is fair division</li>
          <li>Divisible vs indivisible resources</li>
          <li>Proportional fairness and envy-free fairness</li>
          <li>The Cut and Choose Method for fair division</li>
          <li>The Selfridge-Conway Method for fair division</li>
        </ol>
        <p>Let's begin.</p>
      </div>
      <img src={akiThinking} alt="" style={{ maxHeight: 250 }} />
    </Stack>
  </>
)

const FairDivision = () => {
  return (
    <>
      <h2>Fair Division</h2>
      <p>
        <strong>Fair division</strong> means dividing a resource in a way that everyone
        involved believes is fair.
      </p>
      <p>
        Generally speaking, there are two types of resources: divisible and indivisible.
      </p>
      <p>
        <strong>Divisible resources</strong> are resources which can be divided any number
        of times, in any number of places. This could be land, time, airwaves, or anything
        else arbitrarily divisible. When speaking abstractly, we usually refer to a
        divisible resources as a <strong>cake</strong>.
      </p>
      <p>
        Cakes are good examples because they can be cut at any place, as many times as
        necessary, and are usually shared equally.
      </p>
      <ImageContainer>
        <CakeImage flavor="chocolate" width={200} />
        <CakeImage flavor="chocolate" width={200} />
      </ImageContainer>

      <p>
        In contrast, <strong>indivisible resources</strong> can't be split. This could be
        a laptop or a car, the kind of thing you really shouldn't cut in half.
      </p>
      <p>
        For this discussion, we'll focus on <strong>divisible resources</strong>.
      </p>
      <p>Let's explore some examples using (metaphorical) cake.</p>
    </>
  )
}

const SimpleCakeDivision = () => {
  const [selected, setSelected] = useState(false)
  return (
    <>
      <h2>Simple Cake Division</h2>
      <CharacterImage character="Aki" sx={{ float: 'right' }} />
      <p>
        You and your friend Aki have a small chocolate cake. She's divided it into two
        pieces. Which piece do you want?
      </p>

      <Action>Click a piece</Action>

      <ImageContainer spacing={1}>
        <CakeImage
          flavor="chocolate"
          width="200px"
          onClick={() => setSelected(true)}
          sx={{ marginBottom: 2 }}
        />
        <Box borderLeft="4px dashed black" />
        <CakeImage
          flavor="chocolate"
          width="200px"
          onClick={() => setSelected(true)}
          sx={{ marginBottom: 2 }}
        />
      </ImageContainer>
      {selected ? (
        <>
          <p>Yum!</p>
          <p>
            This cake division is fair because both you and Aki receive <sup>1</sup>
            &frasl;
            <sub>2</sub> of the cake.
          </p>
          <p>
            When something is entirely make of the the same type of thing, it's{' '}
            <strong>homogenous</strong>, like this single-flavor cake.
          </p>
          <p>
            Dividing <strong>homogenous</strong> cakes fairly is simple. If you have a
            number of people, which we'll call <em>n</em>, then simply divide the cake
            into <em>n</em> equal pieces. Easy!
          </p>
        </>
      ) : null}
    </>
  )
}

const MeaningOfFair = () => {
  return (
    <>
      <h2>The Meaning of Fair</h2>
      <p>But what does “fair” really mean?</p>
      <p>
        One way to define fair is <strong>proportionality</strong>. A cake division is{' '}
        <strong>proportional</strong> if for <em>n</em> people, each person receives{' '}
        <sup>1</sup>&frasl;<sub>n</sub> of the cake.
      </p>
      <p>
        For example, with 2 people each get <sup>1</sup>&frasl;
        <sub>2</sub> of the cake, with 3 people, each get <sup>1</sup>&frasl;
        <sub>3</sub>.
      </p>
      <p>
        This is simple with a <strong>homogenous</strong> cake because all the pieces are
        identical, but this gets trickier with <strong>heterogenous</strong> cakes (made of different things).
      </p>
    </>
  )
}

const TwoFlavorCake = ({ preferredFlavor, setPreferredFlavor }: CommonProps) => {
  return (
    <>
      <h2>2-Flavor Cake</h2>
      <p>
        This cake has different parts so is <strong>heterogenous</strong>.
      </p>
      <ImageContainer>
        <CakeImage flavor="vanilla" width="200px" />
        <CakeImage flavor="chocolate" width="200px" />
      </ImageContainer>

      <CharacterImage character="Aki" sx={{ float: 'right' }} />

      <p>
        One half of the cake is chocolate, and the other is vanilla. Aki has divided the
        cake into two pieces right where the flavors meet.
      </p>
      <p>
        <em>Which piece do you want?</em>
      </p>
      <Action>Click a piece</Action>

      <ImageContainer spacing={1}>
        <CakeImage
          flavor="vanilla"
          width="200px"
          onClick={() => setPreferredFlavor('vanilla')}
          sx={{ marginBottom: 2 }}
        />
        <Box borderLeft="4px dashed black" className="blinkLine" />
        <CakeImage
          flavor="chocolate"
          width="200px"
          onClick={() => setPreferredFlavor('chocolate')}
          sx={{ marginBottom: 2 }}
        />
      </ImageContainer>
      {preferredFlavor && (
        <>
          <p>
            Cool. So you prefer <strong>{preferredFlavor}</strong>?
          </p>
          <p>
            Aki is happy to take the other piece because she likes both flavors equally.
          </p>
          <p>
            This solution is <strong>proportional</strong> because Aki gets a piece worth{' '}
            <sup>1</sup>&frasl;
            <sub>2</sub> the cake to her and you get a piece worth <sup>1</sup>&frasl;
            <sub>2</sub> the cake to you.
          </p>
          <p>
            But actually, your share might be worth more than <sup>1</sup>&frasl;
            <sub>2</sub>.
          </p>
        </>
      )}
    </>
  )
}

const BetterThanHalf = ({ preferredFlavor = 'chocolate' }: CommonProps) => {
  const otherFlavor = preferredFlavor === 'chocolate' ? 'vanilla' : 'chocolate'
  return (
    <>
      <h2>Better Than Half</h2>
      <p>
        Since Aki likes chocolate and vanilla equally, she values both pieces of the cake
        at <sup>1</sup>&frasl;
        <sub>2</sub> of the whole.
      </p>
      <Stack direction="row" alignItems="flex-start" justifyContent="center">
        <CakeImage flavor={preferredFlavor} width="200px" />
        <Box fontSize={150}>&gt;</Box>
        <CakeImage flavor={otherFlavor} width="200px" />
      </Stack>
      <p>
        If you like both flavors equally, then this division is <sup>1</sup>&frasl;
        <sub>2</sub> and <sup>1</sup>&frasl;
        <sub>2</sub> for you as well.
      </p>
      <p>
        However, if you like <strong>{preferredFlavor}</strong> more than{' '}
        <strong>{otherFlavor}</strong>, the piece you received is worth{' '}
        <em>
          more than <sup>1</sup>&frasl;
          <sub>2</sub> the cake's value
        </em>
        .
      </p>
      <p>
        Either way, this solution is still <strong>proportionally fair</strong> to Aki
        because she only expected to receive <sup>1</sup>&frasl;
        <sub>2</sub> the value.
      </p>
    </>
  )
}

const CutAndChoose = () => {
  return (
    <>
      <h2>Cut and Choose</h2>
      <p>
        This method of splitting a resource between 2 people is called{' '}
        <strong>Cut and Choose</strong>. It works like this:
      </p>
      <ol>
        <li>
          One person <strong>cuts</strong> the resource into two portions which{' '}
          <strong>they judge to have equal value</strong>. Both portions are equal to them
          so they will accept either one.
        </li>
        <li>
          The second person <strong>chooses</strong> which piece they personally prefer.
          This piece may be worth more to them than <sup>1</sup>&frasl;
          <sub>2</sub> of the whole cake.
        </li>
      </ol>
      <p>
        Cut and Choose is <strong>proportionally fair</strong> to both people. However, if
        the chooser values parts of the cake differently than the cutter, one piece may be
        worth more than half. Therefore, with Cut and Choose, it's better to be the
        chooser.
      </p>
    </>
  )
}
// We use cake cutting for examples of fair division.
const Clarification = () => {
  return (
    <>
      <h2>Clarification</h2>
      <p>Just a quick note on sharing cake.</p>
      <p>
        In the study of fair division we make some assumptions, mainly that everyone wants{' '}
        <strong>as much cake as possible</strong> so we need a method to ensure everyone
        gets a fair share.
      </p>
      <p>
        Since people value parts of the cake differently, fair might mean one person gets
        a smaller piece but of a popular part of the cake. "Fair" doesn't mean equal sized
        pieces for everyone, it means <strong>equal value</strong> pieces for everyone.
      </p>
      <img
        src={akiThinking}
        alt="Aki the cat thinking about the choice between a vanilla piece or a sliver of vanilla and a chocolate piece"
        style={{ maxHeight: 300, display: 'block', margin: 'auto' }}
      />
      <p>
        The amazing thing is, even though everyone has their own subjective preferences
        about the cake, fair division methods <em>always</em> give everyone a piece worth{' '}
        <sup>1</sup>&frasl;
        <sub>n</sub> of the cake value from their own perspective!
      </p>
      <p>
        Keep in mind that this is an economic model, part of game theory. In real life you
        make more friends by being generous, especially if you're sharing a birthday cake!
      </p>

      <p>
        Keeping this in mind, let's split another cake!
      </p>
    </>
  )
}

// The Measuring step is here order-wise but it's complex enough to warrant its own file './MeasuringStep.tsx'

const Recap1 = () => {
  return (
    <>
      <h2>Part 1 Recap</h2>

      <p>Let's go over a few of the terms we've learned:</p>
      <dl>
        <dt>Fair Division</dt>
        <dd>Dividing a resource fairly between all people involved. </dd>

        <dt>Proportionally fair</dt>
        <dd>
          A definition of fairness. For every <em>n</em> people, each person gets{' '}
          <sup>1</sup>
          &frasl;
          <sub>n</sub> of the resource value or more.<br />Example: each of 3 people get at least <sup>1</sup>
          &frasl;
          <sub>3</sub> of the cake's value.
        </dd>

        <dt>Cut and Choose </dt>
        <dd>
          A method for two people to divide a resource in a proportionally fair way.
        </dd>
      </dl>
    </>
  )
}

// styles need work on mobile
const threePreferences = (
  <Box
    marginX="auto"
    marginBottom={8}
    display="grid"
    justifyItems="center"
    alignItems="center"
    gridTemplateColumns={{ xs: 'auto', md: 'auto auto' }}
    sx={{ gridRowGap: { xs: '40px', md: '16px' }, gridColumnGap: '16px' }}
  >
    <img src={cake3PrefAki} style={{ maxHeight: 200 }} alt="" />
    <Stack alignItems="center" marginBottom={2}>
      <CharacterImage character="Aki" hideName />
      Aki likes both vanilla and chocolate
    </Stack>

    <img src={cake3PrefBruno} style={{ maxHeight: 200 }} alt=""/>
    <Stack alignItems="center" marginBottom={2}>
      <CharacterImage character="Bruno" hideName />
      Bruno prefers vanilla
    </Stack>

    <img src={cake3PrefChloe} style={{ maxHeight: 200 }} alt=""/>
    <Stack alignItems="center" marginBottom={2}>
      <CharacterImage character="Chloe" hideName />
      Chloe prefers chocolate
    </Stack>
  </Box>
)

const OverlayText = ({ character, children, ...props }) => (
  <Stack alignItems="center" fontSize={16} {...props}>
    <CharacterImage character={character} hideName width={60} />
    <Box bgcolor={'rgba(255,255,255,0.6)'} border="1px solid black">
      {children}
    </Box>
  </Stack>
)

const EnterPlayer3 = () => {
  return (
    <>
      <h2>Enter Player 3</h2>
      <p>Here we have another cake.</p>
      <ImageContainer>
        <CakeImage flavor="vanilla" />
        <CakeImage flavor="chocolate" />
      </ImageContainer>

      <p>But we need to split it among 3 people this time.</p>
      <ImageContainer>
        <CharacterImage character="Aki" />
        <CharacterImage character="Bruno" />
        <CharacterImage character="Chloe" />
      </ImageContainer>

      <p>Here's how they value the flavors:</p>

      {threePreferences}
      <p>One simple way to split the cake is in thirds like this.</p>
      <Box position="relative" width="fit-content" marginX="auto">
        <Box
          component={'img'}
          src={simple3Results}
          //add alt
          alt=""
          maxHeight={400}
        />
        <Box
          position={{ xs: 'relative', sm: 'absolute' }}
          display="grid"
          gridAutoFlow="row"
          top={0}
          left={0}
          height="100%"
          width="100%"
          paddingBottom="70px"
          paddingTop="20px"
          sx={{ gridRowGap: '12px' }}
          textAlign="center"
        >
          <OverlayText justifySelf="flex-start" character="Aki">
            Aki gets the left piece.
          </OverlayText>
          <OverlayText justifySelf="center" character="Bruno">
            Bruno gets the middle piece,
            <br />
            which includes a part he doesn't value much.
          </OverlayText>
          <OverlayText justifySelf="flex-end" character="Chloe">
            Chloe gets the right piece.
          </OverlayText>
        </Box>
      </Box>

      <p>Here's how they value their portions:</p>
      <ul>
        <li>
          <strong>Aki's</strong> piece is worth <sup>1</sup>&frasl;
          <sub>3</sub> of the cake to her.
        </li>
        <li>
          <strong>Bruno's</strong> piece is worth <sup>1</sup>&frasl;
          <sub>3</sub> of the cake to him.
        </li>
        <li>
          <strong>Chloe's</strong> piece is worth over <sup>1</sup>&frasl;
          <sub>2</sub> of the cake to her, lucky!
        </li>
      </ul>

      <p>
        This solution is <strong>proportionally fair</strong> because everyone gets at
        least <sup>1</sup>&frasl;
        <sub>3</sub> of the cake's value.
      </p>

      <p>
        <em>However,</em> this solution doesn't seem fair to Bruno. From his perspective,
        Aki's all-vanilla piece is worth much more than his own.
      </p>
      <p>
        He <strong>envies</strong> her share and feels cheated.
      </p>
      <CharacterImage
        character="Bruno Sad"
        hideName
        sx={{ display: 'block', margin: 'auto' }}
      />
    </>
  )
}
const EnvyFree = () => {
  return (
    <>
      <h2>Envy Free</h2>
      <p>
        It seems relying on <strong>proportional solutions</strong> leaves some people
        with hurt feelings.
      </p>
      <p>
        Another definition of fairness we can use is <strong>envy-freeness</strong>. A
        solution to a division problem is <strong>envy-free</strong> if no person envies
        another's piece.
      </p>
      <p>
        An envy-free solution is <strong>proportional</strong> as well. Logically, if a
        cake is split into <em>n</em> pieces, then the most valuable piece for each person
        must be worth at least <sup>1</sup>&frasl;
        <sub>n</sub> of the whole.
      </p>
      <p>
        Cut and Choose is proportional and envy-free, but this gets trickier with more
        people.
      </p>
    </>
  )
}
const SelfridgeConway = () => {
  return (
    <>
      <h2>The Selfridge-Conway Method</h2>
      <p>
        In the 1960s, <em>John Selfridge</em> and <em>John Conway</em> independently
        discovered a way of dividing a resource between 3 people in a way that's{' '}
        <strong>guaranteed to be envy-free</strong>.
      </p>

      <p>
        This method is now called the <strong>Selfridge-Conway Method.</strong>
      </p>

      <p>Let's try it out!</p>

      <p></p>
    </>
  )
}
// At one point there was an incomplete explanation of Selfridge Conway in the above step (see below) but I removed it to avoid confusion

 {/* <div>
      <p>
        The steps are more complex than Cut and Choose, you can read them below if you are
        curious.
      </p>
      
      <p>
        The important thing to know is that when using this method each person may get two
        pieces from different parts of the cake.
      </p> 

       <Accordion sx={{ marginY: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="selfridge-panel"
          id="selfridge-panel-header"
        >
          Selfridge-Conway Steps
        </AccordionSummary>
        <AccordionDetails>
          <ol>
            <li>Person 1 divides the cake into 3 pieces they consider equal.</li>
            <li>
              Person 2 trims a bit off what they consider the largest piece until it
              matches the second largest (if needed). The trimmings are set aside.
            </li>
            <li>Person 3 chooses a piece to keep.</li>
            <li>
              Person 2 chooses a piece to keep, but must pick the trimmed piece if
              available. <em>Keep note of who picked the trimmed piece.</em>
            </li>
            <li>Person 1 takes the last piece.</li>
            <li>
              If there are trimmings, the trimmings are then divided up between everyone.
            </li>
            <li>
              Between person 2 and 3, the person who didn't pick the trimmed piece divides
              the trimmings into thirds.
            </li>
            <li>
              The person who <em>did</em> pick the trimmed piece then chooses a piece.
            </li>
            <li>Person 1 chooses a piece.</li>
            <li>The last person chooses a piece.</li>
          </ol>
        </AccordionDetails>
    </Accordion> 
  </div>*/}


// should add an interactive part here.
const ThreeWayDivision = () => {
  return (
    <>
      <h2>Division with the Selfridge-Conway Method</h2>
      <p>Let's see how to create an envy-free outcome.</p>
      <p>Here is the problem again:</p>

      {threePreferences}

      <Box component="p" marginY={6}>
        The cake is split using the Selfridge-Conway Method.
      </Box>

      <GraphContext.Provider
        value={{
          ...createScales({
            innerWidth: 300,
            innerHeight: 80,
            cakeSize: 2,
          }),
          width: 300,
          height: 80,
          labels: sampleLabels3Flavor,
          cakeSize: 2,
          names: ['Aki', 'Bruno', 'Chloe'],
          namesPossessive: ["Aki's", "Bruno's", "Chloe's"],
        }}
      >
        {/* 
          Probably better to actually run the algo than use saved results.
          If we change the phrasing in the steps, this will be stale.
        */}
        <ResultsSteps algoUsed="selfridgeConway" result={sample3PersonResults} />
      </GraphContext.Provider>

      <Box component="p" marginY={6}>
        Due to the trimming step, the cake has been cut into more pieces than before.{' '}
      </Box>

      <Box position="relative" width="fit-content" marginX="auto">
        <Box
          component="img"
          src={selfridgeResults}
          //add alt text
          alt=""
          maxHeight={500}
        />

        <Box
          position={{ xs: 'relative', sm: 'absolute' }}
          display="grid"
          top={0}
          left={0}
          height="100%"
          width="100%"
          paddingX="10px"
          paddingY="30px"
          sx={{
            gridTemplateColumns: 'repeat(3,1fr)',
            gridTemplateRows: 'repeat(3,1fr)',
            gridTemplateAreas: `
              "a1 a2 ." 
              "b . ." 
              "c1 . c2"`,
            gridRowGap: '12px',
          }}
          textAlign="center"
        >
          <OverlayText justifySelf="flex-start" character="Aki" gridArea="a1">
            Aki gets this piece
          </OverlayText>
          <OverlayText justifySelf="center" character="Aki" gridArea="a2">
            and this piece
          </OverlayText>
          <OverlayText justifySelf="flex-end" character="Bruno" gridArea="b">
            Bruno gets these pieces
          </OverlayText>
          <OverlayText justifySelf="flex-start" character="Chloe" gridArea="c1">
            Chloe gets this piece
          </OverlayText>
          <OverlayText justifySelf="center" character="Chloe" gridArea="c2">
            and this piece
          </OverlayText>
        </Box>
      </Box>

      <p>
        Although a bit more involved than before, this solution is{' '}
        <strong>both proportional and envy-free!</strong>
      </p>

      <Info>
        For an explanation as to why this is guaranteed to be envy-free, see{' '}
        <Link href={'https://en.wikipedia.org/wiki/Selfridge%E2%80%93Conway_procedure'}>
          the wikipedia page for the Selfridge-Conway Method.
        </Link>
      </Info>

      {/* <p>Could there be an even better solution?</p> */}
    </>
  )
}

// Removing this part as it confuses people and the example can no longer be Pareto-Optimized
// const ParetoOptimal = () => {
//   return (
//     <>
//       <h2>Pareto-Optimal Solutions</h2>
//       <p>
//         Usually, being envy-free is <em>fair enough</em> to avoid hurt feelings. But what
//         about <em>optimal</em> fairness?
//       </p>
//       <p>
//         Although this solution to the last problem is fair by the envy-free definition,
//         with a slight adjustment to the portions more value could be extracted.
//       </p>
//       <p>
//         A solution where no change would give someone more value without taking value away
//         from someone else is called <strong>Pareto-optimal</strong>.
//       </p>
//       <p>
//         Pareto-optimal solutions aren't necessarily envy-free, but a solution that
//         achieves both is a bit closer to ideal. Unfortunately, such solutions can be
//         difficult to calculate. For this reason, finding an envy-free solution is a more
//         realistic goal.
//       </p>
//       <p>
//         For more info,{' '}
//         <Link href={'https://en.wikipedia.org/wiki/Pareto_efficiency'}>
//           read about Pareto-optimality.
//         </Link>
//       </p>
//     </>
//   )
// }

const Recap2 = () => {
  return (
    <>
      <h2>Part 2 Recap</h2>
      <p>Let's review</p>
      <dl>
        <dt>Envy-free </dt>
        <dd>
          A definition of fairness. In an envy-free solution, no one envies another's
          portion.{' '}
        </dd>

        <dt>Selfridge-Conway Method</dt>
        <dd>A 3-person, envy-free method for fair division.</dd>
      </dl>
    </>
  )
}

const Ending = () => {
  return (
    <>
      <h2>Your Turn</h2>
      <p>I've designed a visual tool for splitting divisible resources.</p>

      <Box
        component="img"
        src={toolExample}
        alt={
          'Visual division tool with a graph-like interface. Values are drawn for strawberry, vanilla, and chocolate. ' +
          'A toolbar at the top shows "Person 1", "Labels", "Add Person", and other options'
        }
        marginX="auto"
        maxWidth={600}
        display="block"
      />

      <p>Give it a try, experiment!</p>
      <p>Split a 10-flavor cake! See if you can follow the algorithms!</p>
      <p>
        The tool uses <strong>Cut and Choose</strong> for 2 people and{' '}
        <strong>the Selfridge-Conway Method</strong> for 3, other algorithms may be added
        in the future.
      </p>

      <Stack alignItems="center" marginY={2}>
        <ButtonLink variant="contained" href="/graph">
          Try the Resource Splitting Tool
        </ButtonLink>
      </Stack>
    </>
  )
}
