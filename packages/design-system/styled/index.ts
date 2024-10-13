import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer'
import { recipe } from '@vanilla-extract/recipes'
import { runtime } from './runtime'
import type { VariantGroups, PatternOptions } from './types'
import type { StyledComponent } from './runtime'

type Elements = keyof JSX.IntrinsicElements

export function styled<I, Variants extends VariantGroups>(
  element: I | keyof JSX.IntrinsicElements,
  options: PatternOptions<Variants>
): I extends StyledComponent<infer T, infer V>
  ? StyledComponent<T, V & Variants>
  : StyledComponent<I, Variants>
export function styled(
  element: Elements | StyledComponent<Elements, VariantGroups>,
  { variants, defaultVariants, compoundVariants, ...base }: PatternOptions<VariantGroups>
): StyledComponent<Elements, VariantGroups> {
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
