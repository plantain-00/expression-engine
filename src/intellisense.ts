import { StringLiteral } from '.'

/**
 * @public
 */
export function getIntellisenseOptions(
  context: IntellisenseContext,
  schema: IntellisenseSchema
): IntellisenseOption[] {
  const result: IntellisenseOption[] = []
  if (context.type === 'StringLiteral') {
    if (schema.stringEnums) {
      const contextValue = context.value.toLowerCase()
      for (const stringEnum of schema.stringEnums) {
        const index = stringEnum.name.toLowerCase().indexOf(contextValue)
        if (index >= 0) {
          result.push({
            ...stringEnum,
            range: [index, index + contextValue.length]
          })
        }
      }
    }
  }
  return result
}

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
        range: [i + 1, cursorPosition]
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
export interface IntellisenseSchema {
  stringEnums?: IntellisenseStringEnum[]
}

/**
 * @public
 */
export interface IntellisenseOption extends IntellisenseStringEnum {
  range: [number, number]
}

/**
 * @public
 */
export interface IntellisenseStringEnum {
  name: string
  description?: string
}

/**
 * @public
 */
export type IntellisenseContext =
  | StringLiteral
  | GlobalContext
  | MemberContext
  | UnknownContext

/**
 * @public
 */
export interface GlobalContext {
  type: 'global'
}

/**
 * @public
 */
export interface MemberContext {
  type: 'member'
}

/**
 * @public
 */
export interface UnknownContext {
  type: 'unknown'
}
