import React, { forwardRef } from 'react'
import type {
  RecipeClassNames,
  VariantGroups,
  VariantSelection,
  VariantsClassNames,
} from './types'
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
> = GetProps<Component> &
  VariantSelection<Variants> &
  GenericComponentProps<Component, Elements>

export interface StyledComponent<Component, Variants extends VariantGroups>
  extends React.ForwardRefExoticComponent<
    Omit<StyledComponentProps<Component, Variants>, 'as'>
  > {
  <T>(props: StyledComponentProps<T, Variants>): React.ReactNode
  toString: () => string
  config: RuntimeConfig<Component, Variants>
}

function getRecipesClassName(
  props: VariantSelection<VariantGroups>,
  config: RuntimeConfig<unknown, VariantGroups>
) {
  let result = config.recipes.map((item) => item.base).join(' ')
  const variants: VariantsClassNames<VariantGroups> = Object.assign(
    {},
    ...config.recipes.map((item) => item.variants)
  )

  for (const variant in variants) {
    const value = props[variant] ?? config.default[variant]

    if (value === undefined) {
      continue
    }

    result += ` ${variants[variant][value]}`
  }

  return result
}

export interface RuntimeConfig<T, Variants extends VariantGroups> {
  element: T
  recipes: RecipeClassNames<Variants>[]
  default: VariantSelection<Variants>
}

export function runtime<T, Variants extends VariantGroups>(
  config: RuntimeConfig<T, Variants>
): StyledComponent<T, Variants>
export function runtime(config: RuntimeConfig<'div', VariantGroups>) {
  function Component(
    props: Partial<GenericComponentProps<'div'>> & VariantSelection<VariantGroups>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const { as: Comp = config.element, ...rest } = props
    return (
      <Comp
        ref={ref}
        {...rest}
        className={cx([rest.className, getRecipesClassName(rest, config)])}
      />
    )
  }

  return Object.assign(forwardRef(Component), {
    toString: () => config.recipes[0].base,
    displayName: 'Styled' + `(${config.element})`,
    config,
  })
}
