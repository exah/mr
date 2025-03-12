import type { StyleRule } from '@vanilla-extract/css'

type NestedStyleRule = StyleRule & {
  [selector: `${string}&${string}`]: NestedStyleRule
}

export type VariantDefinitions = Record<string, StyleRule>
export type VariantGroups = Record<string, VariantDefinitions>

type ExtractValue<T> = T extends 'true' | 'false'
  ? boolean
  : T extends string | number
    ? T
    : never

export type VariantsClassNames<Variants extends VariantGroups> = {
  [P in keyof Variants]: {
    [PP in keyof Variants[P]]: string
  }
}

export interface CompoundVariant<Variants extends VariantGroups> {
  variants: VariantSelection<Variants, never>
  style: StyleRule
}

export interface RecipeClassNames<Variants extends VariantGroups> {
  base: string
  variants: VariantsClassNames<Variants>
}

export type VariantSelection<
  Variants extends VariantGroups,
  Conditions extends ConditionGroups,
> = {
  [Variant in keyof Variants]?:
    | ExtractValue<keyof Variants[Variant]>
    | { [Condition in keyof Conditions]?: ExtractValue<keyof Variants[Variant]> }
    | undefined
}

export type PatternOptions<Variants extends VariantGroups> = NestedStyleRule & {
  variants?: Variants
  defaultVariants?: VariantSelection<Variants, never>
  compoundVariants?: Array<CompoundVariant<Variants>>
}

export type Condition = '@media' | '@supports' | '@container' | '@layer' | 'selectors'
export type ConditionGroups = Record<string, Readonly<{ [Name in Condition]?: string }>>
