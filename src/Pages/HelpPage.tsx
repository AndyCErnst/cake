import { Stack } from '@mui/material'
import { Link } from '../components/Link'
import chooseAlgo from '../images/help/choose algo.png'
import draw from '../images/help/draw preferences.png'
import resizeDiag from '../images/help/resize3.png'
import resizeVert from '../images/help/resize1.png'
import resizeHorz from '../images/help/resize2.png'
import results from '../images/help/results.png'
import results2 from '../images/help/results2.png'
import results3 from '../images/help/results3.png'
import setup1 from '../images/help/setup1.png'
import setup2 from '../images/help/setup2.png'
import fullView from '../images/help/total view.png'
import { maxAgents } from '../Graph/graphConstants'

export const HelpPage = () => {
  return (
    <article>
      <h1>Help Page</h1>
      <p>This page explains the steps and controls of the resource splitting tool.</p>
      <p>
        For a general introduction to fair division, see the{' '}
        <Link href="/learn">Interactive Course</Link>.
      </p>
      <Stack
        spacing={4}
        sx={{
          '& img': {
            maxWidth: 600,
            display: 'block',
            marginX: 'auto',
            marginY: 2,
          },
          '& hr': {
            marginY: 6,
          },
        }}
      >
        <div>
          <h2>Describe the Resource to Split</h2>
          <p>
            This is the initial set up screen. If you want to try things out quickly,
            click "USE SAMPLE VALUES", otherwise follow the prompts.
          </p>
          <img src={setup1} />
          <p>If your resource has sections, define them here.</p>
          <p>
            Sections are labels for parts of the resource. If you are splitting a
            multi-flavor cake, these could be a strawberry, a vanilla, and a chocolate
            section.
          </p>
          <img src={setup2} />

          <p>
            You can give sections different colors and sizes. This is up to you, whatever
            works best for the resource you want to split.
          </p>
          <p>
            If your resource doesn't have sections, we'll still need to know its size.
            Generally you can leave size at 100, but you can increase this number for more
            control, or decrease it for simpler interactions.
          </p>
        </div>

        <div>
          <h2 id="mark">Mark Preferences</h2>
          <p>Next, mark how much you value different parts of resource.</p>
          <img src={draw} />
          <p>
            You can mark value by clicking on the graph at the value level you want.
            Values are on a scale from 0 to 10. They don't mean anything specific; it's
            your opinion so choose a number that makes sense to you.
          </p>
          <p>
            Continue to fill out the graph until you've given a value to all areas in the
            resource. When you are done, click "ADD PERSON" to mark values for the next
            person.
          </p>
        </div>

        <div>
          <h2>Adjusting Values</h2>
          <p>
            You can click and drag the circles up and down to change the value of an area.
          </p>
          <img src={resizeVert} style={{ maxWidth: 300 }} />
          <hr />
          <p>
            Hover over a border between two areas and it becomes thicker. You can click
            and drag the border left and right to resize an area.
          </p>
          <img src={resizeHorz} style={{ maxWidth: 150 }} />
          <hr />
          <p>
            Hover over a corner of an area for a circle to appear. You can click and drag
            this circle to adjust the corner of the area up and down. This creates a value
            that increases or decreases over an area.
          </p>
          <img src={resizeDiag} style={{ maxWidth: 300 }} />
          <p>
            To change an angled area back to a flat area, drag one of the corners until
            it's even with the other.
          </p>
          <p>
            Areas can also be resized using the keyboard. After focusing on a value
            circle, press <kbd>↑</kbd>/<kbd>↓</kbd> to adjust a value in increments of 0.1
            or hold <kbd>Shift</kbd>+<kbd>↑</kbd>/<kbd>↓</kbd> to adjust a value in
            increments of 1. When focusing on a border, press <kbd>←</kbd>/<kbd>→</kbd> to
            adjust a value in increments of 1 or <kbd>Shift</kbd>+<kbd>←</kbd>/
            <kbd>→</kbd> in adjust in increments of 10.
          </p>
        </div>

        <div>
          <h2>Top Controls</h2>
          <p>The top bar of the graph area contains controls.</p>
          <img src={fullView} style={{ maxWidth: '100%' }} />
          <p>These are:</p>
          <ul>
            <li>
              Arrows - Navigate to next or previous person (when there's more than one).
            </li>
            <li>SET SECTIONS - Return to the section label set up.</li>
            <li>ADD PERSON - Add an additional person. The limit is {maxAgents}.</li>
            <li>
              COMPARE - Enter a view where you can compare the value display of all
              people.
            </li>
            <li>
              DONE - Once values are input for all people, click this to split the
              resource.
            </li>
            <li>
              OTHER OPTIONS - This menu includes options to import data, export data, or
              export as image.
            </li>
          </ul>
        </div>

        <div>
          <h2>Choose Method</h2>
          <p>
            After clicking "DONE", you will be prompted with a dialog to choose a
            method/algorithm to use when splitting the resource. Click "FIND SOLUTION" and
            the algorithm will split the resource automatically.
          </p>
          <img src={chooseAlgo} />
          <p>
            Some options are limited on the number of people they support, so won't be
            selectable.
          </p>
        </div>
        <div>
          <h2>Results</h2>
          <p>After the algorithm runs, it displays the results.</p>

          <img src={results} />
          <p>
            This diagram shows where the resource should be split. The 1.1 here means the
            split should be just after the first section.
          </p>
          <p>
            The portion size indicates the area each person gets. This is the{' '}
            <em>physical</em> size of the area, irrespective of value.
          </p>
          <hr />
          <img src={results2} />
          <p>
            This table shows the <em>value</em> each person gets. Here, Person 1 got a
            portion worth 50% of the total to them and Person 2 got a portion worth 88.1%
            of the total to them.
          </p>
          <p>
            Because these values are from each person's perspective, they are independent.
            That's why they can be more than 100%.
          </p>
          <hr />
          <img src={results3} />
          <p>Last, you'll find basic information about how the results were generated.</p>
        </div>
      </Stack>
    </article>
  )
}
