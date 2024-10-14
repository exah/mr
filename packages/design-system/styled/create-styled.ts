import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer'
import { recipe } from '@vanilla-extract/recipes'
import { runtime } from './runtime'
import type { VariantGroups, PatternOptions } from './types'
import type { Elements, StyledComponent } from './runtime'

export function createStyled(): <I, Variants extends VariantGroups>(
  element: I | Elements,
  options: PatternOptions<Variants>
) => I extends StyledComponent<infer T, infer V>
  ? StyledComponent<T, V & Variants>
  : StyledComponent<I, Variants>
export function createStyled() {
  return (
    element: Elements | StyledComponent<Elements, VariantGroups>,
    {
      variants,
      defaultVariants,
      compoundVariants,
      ...base
    }: PatternOptions<VariantGroups>
  ): StyledComponent<Elements, VariantGroups> => {
    const result = recipe({
      base,
      variants,
      compoundVariants,
      defaultVariants,
    })

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
