export const colors = {
  red: '#f00',
  green: '#0f0',
  blue: '#00f',
  yellow: '#ff0',
  teal: '#0ff',
  white: '#fff',
  black: '#000',
} as const

export type Color = keyof typeof colors
