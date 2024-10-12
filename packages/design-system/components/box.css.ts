import { styled } from '../styled'
import { margin, padding } from '../variants'

export const Box = styled('div', {
  variants: {
    ...margin,
    ...padding,
    size: {
      12: { height: 12 },
      24: { height: 24, ':hover': { height: 32 } },
      48: { height: 48 },
    },
    transition: {
      true: { transition: 'height 0.3s' },
    },
  },
  defaultVariants: {
    transition: true,
  },
})
