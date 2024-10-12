import { createTheme } from '@vanilla-extract/css'
import { colors, space, radii } from './tokens'

export const [themeClassName, theme] = createTheme({
  colors,
  space,
  radii,
})
