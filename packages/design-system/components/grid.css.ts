import { styled } from '../styled'
import { gap } from '../variants'
import { Box } from './box.css'

export const Grid = styled(Box, {
  display: 'grid',
  variants: { ...gap },
})
