import type { StyleRule } from '@vanilla-extract/css'
import { keys } from 'utils/helpers'
import { theme } from '../theme.css'
import type { Theme } from '../theme.css'
import type { Space } from '../tokens'

function createSpaceVariant<P extends keyof StyleRule>(
  property: P
): Record<Space, { [key in P]: Theme['space'][Space] }>
function createSpaceVariant(property: keyof StyleRule) {
  return keys(theme.space).reduce<Partial<Record<Space, StyleRule>>>((acc, key) => {
    acc[key] = { [property]: theme.space[key] }
    return acc
  }, {})
}

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
