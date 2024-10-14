import { styled } from '../styled'
import { Grid } from './grid.css'

export const Stack = styled(Grid, {
  gridAutoColumns: 'minmax(0, auto)',
  gridAutoRows: 'minmax(0, auto)',
  variants: {
    orientation: {
      vertical: { gridAutoFlow: 'row' },
      horizontal: { gridAutoFlow: 'column', justifyContent: 'start' },
    },
    align: {
      start: { justifyContent: 'start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'end' },
      justify: { justifyContent: 'space-between' },
      stretch: { justifyContent: 'stretch' },
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})
