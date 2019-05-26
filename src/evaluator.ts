import { Expression, UnaryExpression, LogicalExpression, BinaryExpression, Locale, getLocale, replaceLocaleParameters } from '.'

/**
 * @public
 */
export function evaluateExpression(expression: Expression, context: { [name: string]: unknown }, locale?: Locale) {
  return new Evaluator(locale).evalutate(expression, context, true)
}

class Evaluator {
  constructor(locale?: Locale) {
    this.locale = getLocale(locale)
  }
  private locale: Locale

  // tslint:disable-next-line:cognitive-complexity
  evalutate(expression: Expression, context: { [name: string]: unknown }, isFirstIdentifier: boolean): unknown {
    if (expression.type === 'BinaryExpression') {
      return this.evaluateBinaryExpression(expression, context)
    }
    if (expression.type === 'MemberExpression') {
      const object = this.evalutate(expression.object, context, isFirstIdentifier) as { [property: string]: unknown }
      const property = this.evalutate(expression.property, context, false) as string
      if (expression.optional) {
        return object ? object[property] : undefined
      }
      return object[property]
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
      const args = expression.arguments.map((a) => this.evalutate(a, context, true))
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
    if (expression.type === 'BooleanLiteral') {
      return expression.value
    }
    if (expression.type === 'ArrayExpression') {
      return expression.elements.map((e) => this.evalutate(e, context, true))
    }
    if (expression.type === 'ObjectExpression') {
      const result: { [name: string]: unknown } = {}
      for (const property of expression.properties) {
        const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
        result[key] = this.evalutate(property.value, context, true)
      }
      return result
    }
    throw new Error(this.locale.unexpectToken)
  }

  // tslint:disable-next-line:cognitive-complexity
  private evaluateBinaryExpression(expression: BinaryExpression, context: { [name: string]: unknown }): unknown {
    const left = this.evalutate(expression.left, context, true)
    const right = this.evalutate(expression.right, context, true)
    if (expression.operator === '+') {
      if (typeof left === 'string') {
        if (typeof right !== 'string') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'String', expression.right.range[0]))
        }
        return left + right
      }
      if (typeof left !== 'number' || isNaN(left)) {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.left.range[0]))
      }
      if (typeof right !== 'number' || isNaN(right)) {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.right.range[0]))
      }
      return left + right
    }
    if (expression.operator === '==' || expression.operator === '===' || expression.operator === '!=' || expression.operator === '!==') {
      if (typeof left === 'string') {
        if (typeof right !== 'string') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'String', expression.right.range[0]))
        }
      } else if (typeof left === 'boolean') {
        if (typeof right !== 'boolean') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'String', expression.right.range[0]))
        }
      } else {
        if (typeof left !== 'number') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'String', expression.left.range[0]))
        }
        if (typeof right !== 'number') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'String', expression.right.range[0]))
        }
      }
      return expression.operator === '==' || expression.operator === '===' ? left === right : left !== right
    }

    if (expression.operator === '&&' || expression.operator === '||' || expression.operator === '??') {
      if (expression.operator === '??') {
        return left !== null && left !== undefined ? left : right
      }
      if (typeof left !== 'boolean') {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.left.range[0]))
      }
      if (typeof right !== 'boolean') {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.right.range[0]))
      }
      return expression.operator === '&&' ? left && right : left || right
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
    if (typeof left !== 'boolean') {
      throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.left.range[0]))
    }
    if (expression.operator === '&&') {
      if (left) {
        const right = this.evalutate(expression.right, context, true)
        if (typeof right !== 'boolean') {
          throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.right.range[0]))
        }
        return right
      }
      return false
    }
    if (expression.operator === '||') {
      if (left) {
        return true
      }
      const right = this.evalutate(expression.right, context, true)
      if (typeof right !== 'boolean') {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.right.range[0]))
      }
      return right
    }
    throw new Error(this.locale.unexpectToken)
  }

  private evaluateUnaryExpression(expression: UnaryExpression, context: { [name: string]: unknown }): unknown {
    const value = this.evalutate(expression.argument, context, true)
    if (expression.operator === '!') {
      if (typeof value !== 'boolean') {
        throw new Error(replaceLocaleParameters(this.locale.expect, 'Boolean', expression.argument.range[0]))
      }
      return !value
    }
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(replaceLocaleParameters(this.locale.expect, 'Number', expression.argument.range[0]))
    }
    if (expression.operator === '-') {
      return -value
    }
    if (expression.operator === '+') {
      return value
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
