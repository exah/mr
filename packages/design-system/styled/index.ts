import { createStyled } from './create-styled'

export const styled = createStyled({
  conditions: {
    '@initial': {},
    '@bp1': { '@media': '(min-width: 480px)' },
    '@bp2': { '@media': '(min-width: 768px)' },
  },
  defaultCondition: '@initial',
})

export { createStyled }
export type * from './create-styled'
