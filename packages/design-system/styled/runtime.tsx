import React, { forwardRef } from 'react'
import type {
  RecipeClassNames,
  VariantGroups,
  VariantSelection,
  VariantsClassNames,
  ConditionGroups,
} from './types'
import { merge } from 'utils/helpers'
import { cx } from 'utils/styles'

export type Elements = keyof JSX.IntrinsicElements

export type GetProps<Component> = Component extends Elements
  ? React.ComponentProps<Component>
  : Component extends React.ComponentType<infer Props>
    ? Props
    : unknown

export interface GenericComponentProps<Component, Fallback = never> {
  as: Component | Fallback
  className?: string
  children?: React.ReactNode
}

export type StyledComponentProps<
  Component,
  Variants extends VariantGroups,
  Conditions extends ConditionGroups,
> = GetProps<Component> &
  VariantSelection<Variants, Conditions> &
  GenericComponentProps<Component, Elements>

export interface StyledComponent<
  Component,
  Variants extends VariantGroups,
  Conditions extends ConditionGroups,
> extends React.ForwardRefExoticComponent<
    Omit<StyledComponentProps<Component, Variants, Conditions>, 'as'>
  > {
  <T>(props: StyledComponentProps<T, Variants, Conditions>): React.ReactNode
  toString: () => string
  config: RuntimeConfig<Component, Variants, Conditions>
}

function getRecipesClassName(
  props: VariantSelection<VariantGroups, ConditionGroups>,
  variants: VariantsClassNames<VariantGroups>,
  defaults: VariantSelection<VariantGroups, ConditionGroups>
) {
  let result = ''

  for (const variant in variants) {
    const value = props[variant] ?? defaults[variant]

    if (value === undefined) {
      continue
    }

    if (typeof value === 'object') {
      // TODO
      continue
    }

    result += ` ${variants[variant][value]}`
  }

  return result
}

export interface RuntimeConfig<
  T,
  Variants extends VariantGroups,
  Conditions extends ConditionGroups,
> {
  element: T
  recipes: RecipeClassNames<Variants>[]
  default: VariantSelection<Variants, Conditions>
}

export function runtime<
  T,
  Variants extends VariantGroups,
  Conditions extends ConditionGroups,
>(
  config: RuntimeConfig<T, Variants, Conditions>
): StyledComponent<T, Variants, Conditions>
export function runtime(config: RuntimeConfig<'div', VariantGroups, ConditionGroups>) {
  const base = cx(config.recipes.map((item) => item.base))
  const variants = merge(config.recipes.map((item) => item.variants))

  function Component(
    props: Partial<GenericComponentProps<'div'>> &
      VariantSelection<VariantGroups, ConditionGroups>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const { as: Comp = config.element, ...rest } = props
    return (
      <Comp
        ref={ref}
        {...rest}
        className={cx([
          base,
          getRecipesClassName(rest, variants, config.default),
          rest.className,
        ])}
      />
    )
  }

  return Object.assign(forwardRef(Component), {
    toString: () => `.${config.recipes[0].base}`,
    displayName: 'Styled' + `(${config.element})`,
    config,
  })
}
