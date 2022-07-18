export const hasSymbol: boolean = (
  typeof Symbol !== 'undefined' &&
  typeof Reflect !== 'undefined'
);

export function isUndef(value: unknown): boolean {
  return value === undefined || value === null;
}