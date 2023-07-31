import { Box, Stack } from '@mui/material'
import { LearningPath } from './LearningPath'
import { TextContainer } from '../../Layouts'
import { Link } from '../../components/Link'
import cake from '../../images/happy with cake.png'

export const LearningPage = () => {
  return (
    <article>
      <Box component="h1">Learn About Fair Division</Box>
      <Stack direction={{ xs: 'column-reverse', md: 'row' }}>
        <TextContainer sx={{ marginBottom: 8 }}>
          <p>
            Fair division meaning dividing resources in a way that's{' '}
            <strong>provably fair </strong> for everyone involved . Since Hugo Steinhaus
            first described the “cake cutting” problem in 1944,
            researchers in Economics, Mathematics, and Computer Science have developed{' '}
            <em>hundreds</em> of methods for mathematically fair sharing!
          </p>
          <p>
            Most of these methods are math theories, but a few are quite useful for
            everyday things as well. For example, they can help settle inheritance
            disputes, decide on fair rent for each roommate to pay, or split up unwanted
            tasks like chores. Some methods are even used to settle resource disputes
            between countries!
          </p>
          <h3>Should I be using these methods?</h3>
          <p>Maybe! Here are a few tools build using fair division methods:</p>
          <ul>
            <li>
              New York Times's{' '}
              <Link href="https://www.nytimes.com/interactive/2014/science/rent-division-calculator.html">
                Divide Your Rent Fairly
              </Link>
            </li>
            <li>
              This website's <Link href={'/graph'}>Resource Splitting Tool</Link> for
              divisible resources like cakes, time spans, physical space.
            </li>
          </ul>
          <p>
            In everyday activities, it's probably best to talk things through and reach a
            mutual agreement with others. Fair division methods are most suited for
            situations where everyone wants to <em>maximize</em> the value they receive
            but we still want everyone gets a <em>fair share</em>.
          </p>
          <p>
            If you are curious to learn the logic behind provably fair solutions, I've
            developed a <strong>fun, interactive course</strong>. You'll get to explore the famous cake
            cutting problem, which is the heart of the fair division field. Please check
            it out!
          </p>
        </TextContainer>
        <Stack marginX={6} justifyContent="center" flexShrink={0} paddingY={4}>
          <Box
            component="img"
            src={cake}
            alt="A happy cartoon cat with a slice of vanilla cake and a happy cartoon raccoon with a slice of chocolate cake"
            width={300}

          />
        </Stack>
      </Stack>
      <LearningPath />
    </article>
  )
}
