export const radii = {
  round: '9999px',
  4: '4px',
  8: '8px',
  16: '16px',
} as const

export type Radius = keyof typeof radii
