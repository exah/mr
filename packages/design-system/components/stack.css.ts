import { styled } from '../styled'
import { gap } from '../variants'
import { Box } from './box.css'

export const VStack = styled(Box, {
  display: 'grid',
  gridAutoFlow: 'row',
  variants: { ...gap },
})

export const HStack = styled(VStack, {
  gridAutoFlow: 'column',
})
