import { styled } from '../styled'

export const Button = styled('button', {
  appearance: 'none',
  textAlign: 'start',
  cursor: 'pointer',
  ':disabled': { cursor: 'default' },
})
