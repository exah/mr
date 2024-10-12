export function keys<I extends Readonly<{}>, K extends keyof I>(input: I): K[]
export function keys<I extends Record<PropertyKey, unknown>>(input: I): string[] {
  return Object.keys(input)
}
