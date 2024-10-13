import { theme } from '../theme.css'
import type { StyleRule } from '@vanilla-extract/css'
import type { Space } from '../tokens'
import { keys } from 'utils/array'

const createSpaceVariant = <P extends keyof StyleRule>(property: P) =>
  keys(theme.space).reduce<Partial<Record<Space, StyleRule>>>((acc, key) => {
    acc[key] = { [property]: theme.space[key] }
    return acc
  }, {})

export const margin = {
  m: createSpaceVariant('margin'),
  ml: createSpaceVariant('marginLeft'),
  mr: createSpaceVariant('marginRight'),
  mt: createSpaceVariant('marginTop'),
  mb: createSpaceVariant('marginBottom'),
  mx: createSpaceVariant('marginInline'),
  my: createSpaceVariant('marginBlock'),
} as const

export type Margin = keyof typeof margin

export const padding = {
  p: createSpaceVariant('padding'),
  pl: createSpaceVariant('paddingLeft'),
  pr: createSpaceVariant('paddingRight'),
  pt: createSpaceVariant('paddingTop'),
  pb: createSpaceVariant('paddingBottom'),
  px: createSpaceVariant('paddingInline'),
  py: createSpaceVariant('paddingBlock'),
} as const

export type Padding = keyof typeof padding

export const gap = {
  gap: createSpaceVariant('gap'),
  columnGap: createSpaceVariant('columnGap'),
  rowGap: createSpaceVariant('rowGap'),
} as const

export type Gap = keyof typeof gap
