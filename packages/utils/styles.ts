export const cx = (input: (string | undefined)[]) =>
  input.filter((item) => item !== undefined).join(' ')
