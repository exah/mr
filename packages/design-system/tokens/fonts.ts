const literal = {
  system: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
} as const

const semantic = {
  title: literal['system'],
  body: literal['system'],
  label: literal['system'],
} as const

export const fonts = {
  ...literal,
  ...semantic,
} as const

export type Font = keyof typeof fonts
