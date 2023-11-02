import { Expression, UnaryExpression, LogicalExpression, BinaryExpression, Locale, getLocale, replaceLocaleParameters, SpreadElement, AssignmentPattern, RestElement, Property, ExpressionError } from '.'

/**
 * @public
 */
export function evaluateExpression(
  expression: Expression,
  context: { [name: string]: unknown },
  locale?: Locale,
  // type-coverage:ignore-next-line
  customData?: Array<{ new(...args: any[]): unknown }> | ((value: unknown) => value is CustomData) // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const evaluator = isAsync(expression) ? AsyncEvaluator : Evaluator
  const isCustomData = Array.isArray(customData)
    ? ((value: unknown) => customData.some((c) => value instanceof c)) as (value: unknown) => value is CustomData
    : customData
  return new evaluator(locale, isCustomData).evalutate(expression, context, true)
}

class Evaluator implements EvaluatorProtocol {
  constructor(locale?: Locale, private isCustomData?: (value: unknown) => value is CustomData) {
    this.locale = getLocale(locale)
  }
  locale: Locale

  evalutate(expression: Expression, context: { [name: string]: unknown }, isFirstIdentifier: boolean): unknown {
    return evalutate(expression, context, isFirstIdentifier, this)
  }

  evaluateBinaryExpression(expression: BinaryExpression, context: { [name: string]: unknown }): unknown {
    const left = this.evalutate(expression.left, context, true)
    const right = this.evalutate(expression.right, context, true)
    return evaluateBinaryExpression(expression, left, right, this.locale, this.isCustomData)
  }

  evaluateLogicalExpression(expression: LogicalExpression, context: { [name: string]: unknown }): unknown {
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
    throw new ExpressionError(this.locale.unexpectToken, expression.range)
  }

  evaluateUnaryExpression(expression: UnaryExpression, context: { [name: string]: unknown }): unknown {
    const value = this.evalutate(expression.argument, context, true)
    return evaluateUnaryExpression(expression, value, this.locale)
  }
}

class AsyncEvaluator implements EvaluatorProtocol {
  constructor(locale?: Locale, private isCustomData?: (value: unknown) => value is CustomData) {
    this.locale = getLocale(locale)
  }
  locale: Locale

  evalutate(expression: Expression, context: { [name: string]: unknown }, isFirstIdentifier: boolean): unknown {
    return evalutate(expression, context, isFirstIdentifier, this)
  }

  async evaluateBinaryExpression(expression: BinaryExpression, context: { [name: string]: unknown }): Promise<unknown> {
    const left = await this.evalutate(expression.left, context, true)
    const right = await this.evalutate(expression.right, context, true)
    return evaluateBinaryExpression(expression, left, right, this.locale, this.isCustomData)
  }

  evaluateLogicalExpression(expression: LogicalExpression, context: { [name: string]: unknown }): unknown {
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
    throw new ExpressionError(this.locale.unexpectToken, expression.range)
  }

  async evaluateUnaryExpression(expression: UnaryExpression, context: { [name: string]: unknown }): Promise<unknown> {
    const value = await this.evalutate(expression.argument, context, true)
    return evaluateUnaryExpression(expression, value, this.locale)
  }
}

interface EvaluatorProtocol {
  locale: Locale
  evalutate(expression: Expression, context: { [name: string]: unknown }, isFirstIdentifier: boolean): unknown
  evaluateBinaryExpression(expression: BinaryExpression, context: { [name: string]: unknown }): unknown
  evaluateLogicalExpression(expression: LogicalExpression, context: { [name: string]: unknown }): unknown
  evaluateUnaryExpression(expression: UnaryExpression, context: { [name: string]: unknown }): unknown
}

function evalutate(
  expression: Expression,
  context: { [name: string]: unknown },
  isFirstIdentifier: boolean,
  protocol: EvaluatorProtocol,
): unknown {
  if (expression.type === 'BinaryExpression') {
    return protocol.evaluateBinaryExpression(expression, context)
  }
  if (expression.type === 'MemberExpression') {
    const object = protocol.evalutate(expression.object, context, true) as { [property: string]: unknown }
    const property = protocol.evalutate(expression.property, context, false) as string
    if (expression.optional && !object) {
      return undefined
    }
    if (!['length', 'name', 'toString', 'valueOf', 'toLocaleString'].includes(property)
      && (property in Object.prototype || property in Function.prototype)) {
      throw new ExpressionError(`No access to property "${property}"`, expression.property.range)
    }
    const value = object[property]
    return typeof value === 'function' ? value.bind(object) : value
  }
  if (expression.type === 'ConditionalExpression') {
    const test = protocol.evalutate(expression.test, context, true)
    if (test) {
      return protocol.evalutate(expression.consequent, context, true)
    }
    return protocol.evalutate(expression.alternate, context, true)
  }
  if (expression.type === 'CallExpression') {
    const callee = protocol.evalutate(expression.callee, context, true) as (...args: unknown[]) => unknown
    const args: unknown[] = []
    for (const a of expression.arguments) {
      if (a.type === 'SpreadElement') {
        args.push(...protocol.evalutate(a.argument, context, true) as unknown[])
      } else {
        args.push(protocol.evalutate(a, context, true))
      }
    }
    return callee(...args)
  }
  if (expression.type === 'LogicalExpression') {
    return protocol.evaluateLogicalExpression(expression, context)
  }
  if (expression.type === 'UnaryExpression') {
    return protocol.evaluateUnaryExpression(expression, context)
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
        items.push(...protocol.evalutate(e.argument, context, true) as unknown[])
      } else {
        items.push(protocol.evalutate(e, context, true))
      }
    }
    return items
  }
  if (expression.type === 'ObjectExpression') {
    const result: { [name: string]: unknown } = {}
    for (const property of expression.properties) {
      if (property.type === 'Property') {
        const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
        result[key] = protocol.evalutate(property.value, context, true)
      } else {
        Object.assign(result, protocol.evalutate(property.argument, context, true))
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
              newContext[pattern.left.name] = protocol.evalutate(pattern.right, newContext, true)
            } else {
              newContext[pattern.left.name] = params[i]
            }
          } else {
            newContext[pattern.argument.name] = params.slice(i)
          }
        }
      }
      return protocol.evalutate(expression.body, newContext, true)
    }
  }
  throw new ExpressionError(protocol.locale.unexpectToken, expression.range)
}

function evaluateBinaryExpression(
  expression: BinaryExpression,
  left: unknown,
  right: unknown,
  locale: Locale,
  isCustomData?: (value: unknown) => value is CustomData,
): unknown {
  if (isCustomData) {
    if (isCustomData(left)) {
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
    if (isCustomData(right)) {
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
      throw new ExpressionError(replaceLocaleParameters(locale.expect, 'Number', expression.left.range[0]), expression.left.range)
    }
    if (typeof right === 'string') {
      return left + right
    }
    if (typeof right !== 'number' || isNaN(right)) {
      throw new ExpressionError(replaceLocaleParameters(locale.expect, 'Number', expression.right.range[0]), expression.right.range)
    }
    return left + right
  }
  if (expression.operator === '==' || expression.operator === '===' || expression.operator === '!=' || expression.operator === '!==') {
    return expression.operator === '==' || expression.operator === '===' ? left === right : left !== right
  }
  
  if (typeof left === 'string' && typeof right === 'string') {
    if (expression.operator === '>') {
      return left > right;
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
  }
  
  if (expression.operator === '|>') {
    return (right as (arg: unknown) => unknown)(left)
  }

  if (typeof left !== 'number') {
    throw new ExpressionError(replaceLocaleParameters(locale.expect, 'Number', expression.left.range[0]), expression.left.range)
  }
  if (typeof right !== 'number') {
    throw new ExpressionError(replaceLocaleParameters(locale.expect, 'Number', expression.right.range[0]), expression.right.range)
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

  throw new ExpressionError(locale.unexpectToken, expression.range)
}

function evaluateUnaryExpression(
  expression: UnaryExpression,
  value: unknown,
  locale: Locale,
): unknown {
  if (expression.operator === '!') {
    return !value
  }
  if (expression.operator === '+' && (typeof value === 'number' || typeof value === 'string')) {
    return +value
  }
  if (typeof value !== 'number' || isNaN(value)) {
    throw new ExpressionError(replaceLocaleParameters(locale.expect, 'Number', expression.argument.range[0]), expression.argument.range)
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
  if (expression.operator === 'await') {
    return value
  }
  throw new ExpressionError(locale.unexpectToken, expression.range)
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

function isAsync(expression: Expression | SpreadElement | AssignmentPattern | RestElement | Property): boolean {
  if (expression.type === 'NumericLiteral') {
    return false
  }
  if (expression.type === 'StringLiteral') {
    return false
  }
  if (expression.type === 'Identifier') {
    return false
  }
  if (expression.type === 'ThisExpression') {
    return false
  }
  if (expression.type === 'NullLiteral') {
    return false
  }
  if (expression.type === 'BooleanLiteral') {
    return false
  }
  if (expression.type === 'SpreadElement' || expression.type === 'RestElement') {
    return isAsync(expression.argument)
  }
  if (expression.type === 'AssignmentPattern') {
    return isAsync(expression.left) || isAsync(expression.right)
  }
  if (expression.type === 'ArrayExpression') {
    return expression.elements.some((e) => isAsync(e))
  }
  if (expression.type === 'ArrowFunctionExpression') {
    return expression.params.some((e) => isAsync(e)) || isAsync(expression.body)
  }
  if (expression.type === 'UnaryExpression') {
    if (expression.operator === 'await') {
      return true
    }
    return isAsync(expression.argument)
  }
  if (expression.type === 'BinaryExpression' || expression.type === 'LogicalExpression') {
    return isAsync(expression.left) || isAsync(expression.right)
  }
  if (expression.type === 'MemberExpression') {
    return isAsync(expression.object) || isAsync(expression.property)
  }
  if (expression.type === 'CallExpression') {
    return expression.arguments.some((e) => isAsync(e)) || isAsync(expression.callee)
  }
  if (expression.type === 'ConditionalExpression') {
    return isAsync(expression.test) || isAsync(expression.consequent) || isAsync(expression.alternate)
  }
  if (expression.type === 'Property') {
    return isAsync(expression.key) || isAsync(expression.value)
  }
  if (expression.type === 'ObjectExpression') {
    return expression.properties.some((e) => isAsync(e))
  }
  return expression.params.some((e) => isAsync(e))
}
