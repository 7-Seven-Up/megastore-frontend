export const optionalToNull = (value: string | undefined) =>
  !value ? null : value;
