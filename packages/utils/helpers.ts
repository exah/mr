export function keys<I extends Readonly<{}>, K extends keyof I>(input: I): K[]
export function keys(input: Record<PropertyKey, unknown>): string[] {
  return Object.keys(input)
}

export function entries<I extends Readonly<{}>, K extends keyof I>(input: I): [K, I[K]][]
export function entries(input: Record<PropertyKey, unknown>): [string, unknown][] {
  return Object.entries(input)
}

export function merge<T, R>(input: [T, ...R[]]): {} & T & R
export function merge<O>(input: O[]): {} & O
export function merge(input: object[]): object {
  return Object.assign({}, ...input)
}
