import type { StyleRule } from '@vanilla-extract/css'

type NestedStyleRule = StyleRule & {
  [selector: `${string}&${string}`]: NestedStyleRule
}

export type VariantDefinitions = Record<string, StyleRule>
export type VariantGroups = Record<string, VariantDefinitions>

type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T

type VariantsClassNames<Variants extends VariantGroups> = {
  [P in keyof Variants]: {
    [PP in keyof Variants[P]]: string
  }
}

interface CompoundVariant<Variants extends VariantGroups> {
  variants: VariantSelection<Variants>
  style: StyleRule
}

export type RecipeClassNames<Variants extends VariantGroups> = {
  base: string
  variants: VariantsClassNames<Variants>
}

export type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?: BooleanMap<keyof Variants[VariantGroup]> | undefined
}

export type PatternOptions<Variants extends VariantGroups> = NestedStyleRule & {
  variants?: Variants
  defaultVariants?: VariantSelection<Variants>
  compoundVariants?: Array<CompoundVariant<Variants>>
}
