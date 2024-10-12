import React, { forwardRef } from 'react'
import type { RecipeClassNames, VariantGroups, VariantSelection } from './types'

type GetProps<T> = T extends keyof JSX.IntrinsicElements
  ? React.ComponentProps<T>
  : T extends React.ComponentType<infer Props>
    ? Props
    : unknown

interface StyledComponentProps<T> {
  as?: T
  className?: string
}

type GenericComponentProps<T, V extends VariantGroups, P = GetProps<T>> = P &
  StyledComponentProps<T> &
  VariantSelection<V>

interface GenericComponent<P, V extends VariantGroups> {
  <T>(props: GenericComponentProps<T, V, P>): React.ReactNode
}

interface GenericForwardRefComponent<P, V extends VariantGroups>
  extends React.ExoticComponent<never>,
    GenericComponent<P, V> {
  toString: () => string
  element: keyof JSX.IntrinsicElements
  recipes: RecipeClassNames<VariantGroups>[]
}

function cx(input: (string | undefined)[]) {
  return input.filter((item) => item !== undefined).join(' ')
}

function getRecipesClassName(
  props: VariantSelection<VariantGroups>,
  config: RuntimeConfig<unknown, VariantGroups>
) {
  let result = config.recipes.base

  for (const variant in config.recipes.variants) {
    const value = props[variant] ?? config.default[variant]

    if (value === undefined) {
      continue
    }

    result += ` ${config.recipes.variants[variant][value]}`
  }

  return result
}

interface RuntimeConfig<T, V extends VariantGroups> {
  element: T
  recipes: RecipeClassNames<V>
  default: VariantSelection<V>
}

export function runtime<T, V extends VariantGroups>(
  config: RuntimeConfig<T, V>
): GenericForwardRefComponent<GetProps<T>, V>
export function runtime(config: RuntimeConfig<'div', VariantGroups>) {
  function Component(
    {
      as: Comp = config.element,
      ...rest
    }: StyledComponentProps<'div'> & VariantSelection<VariantGroups>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <Comp
        ref={ref}
        {...rest}
        className={cx([rest.className, getRecipesClassName(rest, config)])}
      />
    )
  }

  return Object.assign(forwardRef(Component), {
    toString: () => config.recipes.base,
    displayName: 'styled' + `(${config.element})`,
    element: config.element,
    recipes: [config.recipes],
  })
}
