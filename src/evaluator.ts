import { Expression, UnaryExpression, LogicalExpression, BinaryExpression, Locale, getLocale, replaceLocaleParameters } from '.'

/**
 * @public
 */
export function evaluateExpression(
  expression: Expression,
  context: { [name: string]: unknown },
  locale?: Locale,
  isCustomData?: (value: unknown) => value is CustomData
) {
  return new Evaluator(locale, isCustomData).evalutate(expression, context, true)
}

class Evaluator {
  constructor(locale?: Locale, private isCustomData?: (value: unknown) => value is CustomData) {
    this.locale = getLocale(locale)
  }
  private locale: Locale

  evalutate(expression: Expression, context: { [name: string]: unknown }, isFirstIdentifier: boolean): unknown {
    if (expression.type === 'BinaryExpression') {
      return this.evaluateBinaryExpression(expression, context)
    }
    if (expression.type === 'MemberExpression') {
      const object = this.evalutate(expression.object, context, isFirstIdentifier) as { [property: string]: unknown }
      const property = this.evalutate(expression.property, context, false) as string
      if (expression.optional && !object) {
        return undefined
      }
      const value = object[property]
      return typeof value === 'function' ? value.bind(object) : value
    }
    if (expression.type === 'ConditionalExpression') {
      const test = this.evalutate(expression.test, context, true)
      if (test) {
        return this.evalutate(expression.consequent, context, true)
      }
      return this.evalutate(expression.alternate, context, true)
    }
    if (expression.type === 'CallExpression') {
      const callee = this.evalutate(expression.callee, context, true) as (...args: unknown[]) => unknown
      const args: unknown[] = []
      for (const a of expression.arguments) {
        if (a.type === 'SpreadElement') {
          args.push(...this.evalutate(a.argument, context, true) as unknown[])
        } else {
          args.push(this.evalutate(a, context, true))
        }
      }
      return callee(...args)
    }
    if (expression.type === 'LogicalExpression') {
      return this.evaluateLogicalExpression(expression, context)
    }
    if (expression.type === 'UnaryExpression') {
      return this.evaluateUnaryExpression(expression, context)
    }
    if (expression.type === 'Identifier' || expression.type === 'ThisExpression') {
      const identifier = expression.type === 'Identifier' ? expression.name : 'this'
      if (isFirstIdentifier) {
        return context[identifier]
      }
      return identifier
    }
    if (expression.type === 'NumericLiteral') {
      return expression.value
    }
    if (expression.type === 'StringLiteral') {
      return expression.value
    }
    if (expression.type === 'NullLiteral') {
      return null
    }
    if (expression.type === 'BooleanLiteral') {
      return expression.value
    }
    if (expression.type === 'ArrayExpression') {
      const items: unknown[] = []
      for (const e of expression.elements) {
        if (e.type === 'SpreadElement') {
          items.push(...this.evalutate(e.argument, context, true) as unknown[])
        } else {
          items.push(this.evalutate(e, context, true))
        }
      }
      return items
    }
    if (expression.type === 'ObjectExpression') {
      const result: { [name: string]: unknown } = {}
      for (const property of expression.properties) {
        if (property.type === 'Property') {
          const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
          result[key] = this.evalutate(property.value, context, true)
        } else {
          Object.assign(result, this.evalutate(property.argument, context, true))
        }
      }
      return result
    }
    if (expression.type === 'ArrowFunctionExpression') {
      return (...params: unknown[]) => {
        let newContext: { [name: string]: unknown }
        if (params.length === 0) {
          newContext = context
        } else {
          newContext = { ...context }
          for (let i = 0; i < params.length && i < expression.params.length; i++) {
            const pattern = expression.params[i]
            if (pattern.type === 'Identifier') {
              newContext[pattern.name] = params[i]
            } else if (pattern.type === 'AssignmentPattern') {
              if (params[i] === undefined) {
                newContext[pattern.left.name] = this.evalutate(pattern.right, newContext, true)
              } else {
                newContext[pattern.left.name] = params[i]
              }
            } else {
              newContext[pattern.argument.name] = params.slice(i)
            }
          }
        }
        return this.evalutate(expression.body, newContext, true)
      }
    }
    throw new Error(this.locale.unexpectToken)
  }

  private evaluateBinaryExpression(expression: BinaryExpression, context: { [name: string]: unknown }): unknown {
    const left = this.evalutate(expression.left, context, true)
    const right = this.evalutate(expression.right, context, true)

    if (this.isCustomData) {
      if (this.isCustomData(left)) {
        if (expression.operator === '+' && left.add) {
          return left.add(right)
        }
        if (expression.operator === '-' && left.subtract) {
          return left.subtract(right)
        }
        if (expression.operator === '*' && left.multiply) {
          return left.multiply(right)
        }
        if (expression.operator === '/' && left.divide) {
          return left.divide(right)
        }
        if (expression.operator === '%' && left.remainer) {
          return left.remainer(right)
        }
        if (expression.operator === '**' && left.power) {
          return left.power(right)
        }
        if ((expression.operator === '==' || expression.operator === '===') && left.equal) {
          return left.equal(right)
        }
        if ((expression.operator === '!=' || expression.operator === '!==') && left.equal) {
          return !left.equal(right)
        }
        if (expression.operator === '<' && left.lessThan) {
          return left.lessThan(right)
        }
        if (expression.operator === '>' && left.greaterThan) {
          return left.greaterThan(right)
        }
        if (expression.operator === '<=' && left.lessThanOrEqual) {
          return left.lessThanOrEqual(right)
        }
        if (expression.operator === '>' && left.greaterThanOrEqual) {
          return left.greaterThanOrEqual(right)
        }
      }
      if (this.isCustomData(right)) {
        if (expression.operator === '+' && right.added) {
          return right.added(left)
        }
        if (expression.operator === '-' && right.subtracted) {
          return right.subtracted(left)
        }
        if (expression.operator === '*' && right.multiplied) {
          return right.multiplied(left)
        }
        if (expression.operator === '/' && right.divided) {
          return right.divided(left)
        }
        if (expression.operator === '%' && right.remainered) {
          return right.remainered(left)
        }
        if (expression.operator === '**' && right.powered) {
          return right.powered(left)
        }
        if ((expression.operator === '==' || expression.operator === '===') && right.equal) {
          return right.equal(left)
        }
        if ((expression.operator === '!=' || expression.operator === '!==') && right.equal) {
          return !right.equal(left)
        }
        if (expression.operator === '<' && right.greaterThanOrEqual) {
          return right.greaterThanOrEqual(left)
        }
        if (expression.operator === '>' && right.lessThanOrEqual) {
          return right.lessThanOrEqual(left)
        }
        if (expression.operator === '<=' && right.greaterThan) {
          return right.greaterThan(left)
        }
        if (expression.operator === '>=' && right.lessThan) {
          return right.lessThan(left)
        }
      }
    }

    if (expression.operator === '+') {
      if (typeof left === 'string') {
        return left + right
      }
      if (typeof left !== 'number' || isNaN(left)) {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.left.range[0]))
      }
      if (typeof right === 'string') {
        return left + right
      }
      if (typeof right !== 'number' || isNaN(right)) {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.right.range[0]))
      }
      return left + right
    }
    if (expression.operator === '==' || expression.operator === '===' || expression.operator === '!=' || expression.operator === '!==') {
      return expression.operator === '==' || expression.operator === '===' ? left === right : left !== right
    }

    if (expression.operator === '|>') {
      return (right as (arg: unknown) => unknown)(left)
    }

    if (typeof left !== 'number') {
      throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.left.range[0]))
    }
    if (typeof right !== 'number') {
      throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.right.range[0]))
    }
    if (expression.operator === '-') {
      return left - right
    }
    if (expression.operator === '*') {
      return left * right
    }
    if (expression.operator === '/') {
      return left / right
    }
    if (expression.operator === '%') {
      return left % right
    }
    if (expression.operator === '>') {
      return left > right
    }
    if (expression.operator === '>=') {
      return left >= right
    }
    if (expression.operator === '<') {
      return left < right
    }
    if (expression.operator === '<=') {
      return left <= right
    }
    if (expression.operator === '**') {
      return left ** right
    }
    if (expression.operator === '>>') {
      return left >> right
    }
    if (expression.operator === '<<') {
      return left << right
    }
    if (expression.operator === '>>>') {
      return left >>> right
    }
    if (expression.operator === '&') {
      return left & right
    }
    if (expression.operator === '^') {
      return left ^ right
    }
    if (expression.operator === '|') {
      return left | right
    }

    throw new Error(this.locale.unexpectToken)
  }

  private evaluateLogicalExpression(expression: LogicalExpression, context: { [name: string]: unknown }): unknown {
    const left = this.evalutate(expression.left, context, true)
    if (expression.operator === '&&') {
      return left && this.evalutate(expression.right, context, true)
    }
    if (expression.operator === '||') {
      return left || this.evalutate(expression.right, context, true)
    }
    if (expression.operator === '??') {
      return left !== null && left !== undefined ? left : this.evalutate(expression.right, context, true)
    }
    throw new Error(this.locale.unexpectToken)
  }

  private evaluateUnaryExpression(expression: UnaryExpression, context: { [name: string]: unknown }): unknown {
    const value = this.evalutate(expression.argument, context, true)
    if (expression.operator === '!') {
      return !value
    }
    if (expression.operator === '+' && (typeof value === 'number' || typeof value === 'string')) {
      return +value
    }
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.argument.range[0]))
    }
    if (expression.operator === '-') {
      return -value
    }
    if (expression.operator === '~') {
      return ~value
    }
    if (expression.operator === '%') {
      return value / 100
    }
    throw new Error(this.locale.unexpectToken)
  }
}

/**
 * @public
 */
export interface CustomData {
  add?(right: unknown): unknown
  added?(left: unknown): unknown

  subtract?(right: unknown): unknown
  subtracted?(left: unknown): unknown

  multiply?(right: unknown): unknown
  multiplied?(left: unknown): unknown

  divide?(right: unknown): unknown
  divided?(left: unknown): unknown

  remainer?(right: unknown): unknown
  remainered?(left: unknown): unknown

  equal?(value: unknown): unknown

  lessThan?(value: unknown): unknown
  greaterThan?(value: unknown): unknown

  lessThanOrEqual?(value: unknown): unknown
  greaterThanOrEqual?(value: unknown): unknown

  power?(value: unknown): unknown
  powered?(value: unknown): unknown
}
