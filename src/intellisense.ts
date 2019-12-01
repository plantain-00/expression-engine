import { StringLiteral } from '.'

/**
 * @public
 */
export function getIntellisenseContext(expression: string, cursorPosition: number): IntellisenseContext {
  for (let i = cursorPosition - 1; i >= 0; i--) {
    const c = expression[i]
    if (c === '"' || c === "'") {
      return {
        type: 'StringLiteral',
        value: expression.substring(i + 1, cursorPosition),
        range: [i, cursorPosition]
      }
    }
  }
  return {
    type: 'unknown'
  }
}

/**
 * @public
 */
export type IntellisenseContext = StringLiteral | UnknownContext

/**
 * @public
 */
export interface UnknownContext {
  type: 'unknown'
}
