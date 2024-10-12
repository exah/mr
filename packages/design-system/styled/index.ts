import { addFunctionSerializer } from '@vanilla-extract/css/functionSerializer'
import { recipe } from '@vanilla-extract/recipes'
import { runtime } from './runtime'
import type { VariantGroups, PatternOptions } from './types'

export function styled<T extends keyof JSX.IntrinsicElements, V extends VariantGroups>(
  element: T,
  { variants, defaultVariants, compoundVariants, ...base }: PatternOptions<V>
) {
  const result = recipe<V>({ base, variants, compoundVariants, defaultVariants })
  const config = {
    element,
    recipes: result.classNames,
    default: defaultVariants ?? {},
  }

  return addFunctionSerializer(runtime<T, V>(config), {
    importPath: 'design-system/styled/runtime',
    importName: 'runtime',
    args: [config],
  })
}
