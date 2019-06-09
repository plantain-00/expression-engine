/**
 * @public
 */
export const defaultLocale = {
  multipleDecimalPoint: 'Multiple decimal point: {0}',
  expect: 'Expect {0}: {1}',
  unexpectToken: 'Unexpected token: {0} {1}',
  expectUnaryOperator: 'Expect unary operator: {0}',
  expectConditionalOperator: 'Expect conditional operator: {0} {1}',
  invalidPropertyName: 'Invalid property name: {0}',
  emptyExpression: 'Empty expression',
  invalidFunctionParameter: 'Invalid function parameter: {0}'
}

export type Locale = typeof defaultLocale

export function getLocale(locale: null | undefined | Locale): Locale {
  return locale || defaultLocale
}

export function replaceLocaleParameters(locale: string, ...parameters: (number | string)[]) {
  for (let i = 0; i < parameters.length; i++) {
    locale = locale.replace(`{${i}}`, parameters[i].toString())
  }
  return locale
}
