const literal = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
  yellow: '#ff0',
  teal: '#0ff',
  white: '#fff',
  black: '#000',
} as const

const semantic = {
  'page-text': literal['black'],
  'page-background': literal['white'],
} as const

export const colors = {
  ...literal,
  ...semantic,
} as const

export type Color = keyof typeof colors
