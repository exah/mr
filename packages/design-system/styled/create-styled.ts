import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer'
import { recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'
import { runtime } from './runtime'
import { entries } from 'utils/helpers'
import type { VariantGroups, PatternOptions, ConditionGroups } from './types'
import type { Elements, StyledComponent } from './runtime'

interface CreateStyledOptions<Conditions extends ConditionGroups> {
  conditions: Conditions
  defaultCondition: keyof Conditions
}

export function createStyled<Conditions extends ConditionGroups>(
  options: CreateStyledOptions<Conditions>
): <I, Variants extends VariantGroups>(
  element: I | Elements,
  options: PatternOptions<Variants>
) => I extends StyledComponent<infer T, infer V, Conditions>
  ? StyledComponent<T, V & Variants, Conditions>
  : StyledComponent<I, Variants, Conditions>
export function createStyled(options: CreateStyledOptions<ConditionGroups>) {
  return (
    element: Elements | StyledComponent<Elements, VariantGroups, ConditionGroups>,
    {
      variants,
      defaultVariants,
      compoundVariants,
      ...base
    }: PatternOptions<VariantGroups>
  ): StyledComponent<Elements, VariantGroups, ConditionGroups> => {
    const result = recipe({
      base,
      variants,
      compoundVariants,
      defaultVariants,
    })

    for (const [name, condition] of entries(options.conditions)) {
      for (const [conditionDefinition, conditionValue] of entries(condition)) {
        if (conditionValue === undefined) {
          continue
        }

        for (const [variantGroup, variantDefinition] of entries(variants ?? {})) {
          for (const [variantItem, variantStyles] of entries(variantDefinition)) {
            const className = style({
              [conditionDefinition]: {
                [conditionValue]: variantStyles,
              },
            })
          }
        }
      }
    }

    const config =
      typeof element === 'string'
        ? {
            element,
            recipes: [result.classNames],
            default: defaultVariants ?? {},
          }
        : {
            element: element.config.element,
            recipes: [result.classNames, ...element.config.recipes],
            default: { ...element.config.default, ...defaultVariants },
          }

    return addFunctionSerializer(runtime(config), {
      importPath: 'design-system/styled/runtime',
      importName: 'runtime',
      args: [config],
    })
  }
}
