import { styled } from '../styled'
import { theme } from '../theme.css'

export const Box = styled('div', {
  boxSizing: 'border-box',
  display: 'block',
  background: theme.colors['red'],
  'div:hover &': {
    background: theme.colors['yellow'],
    'body:hover &': {
      borderColor: theme.colors['blue'],
      borderStyle: 'solid',
      borderWidth: '2px',
      height: '32px',
    },
  },
  variants: {
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
