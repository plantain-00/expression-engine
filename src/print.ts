import { Expression, SpreadElement, AssignmentPattern, RestElement, Property, postfixUnaryOperators, priorizedBinaryOperators } from '.'

/**
 * @public
 */
export function printExpression(expression: Expression): string {
  return print(expression)
}

function print(expression: Expression | SpreadElement | AssignmentPattern | RestElement | Property, priority = Number.MAX_SAFE_INTEGER): string {
  if (expression.type === 'NumericLiteral') {
    return expression.value.toString()
  }
  if (expression.type === 'StringLiteral') {
    return `'${expression.value}'`
  }
  if (expression.type === 'Identifier') {
    return expression.name
  }
  if (expression.type === 'ThisExpression') {
    return 'this'
  }
  if (expression.type === 'NullLiteral') {
    return 'null'
  }
  if (expression.type === 'BooleanLiteral') {
    return expression.value ? 'true' : 'false'
  }
  if (expression.type === 'SpreadElement' || expression.type === 'RestElement') {
    return '...' + print(expression.argument)
  }
  if (expression.type === 'AssignmentPattern') {
    return print(expression.left) + ' = ' + print(expression.right)
  }
  if (expression.type === 'ArrayExpression') {
    return '[' + expression.elements.map((e) => print(e)).join(', ') + ']'
  }
  if (expression.type === 'ArrowFunctionExpression') {
    const params = expression.params.map((p) => print(p)).join(', ')
    const body = print(expression.body)
    if (expression.params.length === 1 && expression.params[0].type === 'Identifier') {
      return `${params} => ${body}`
    }
    return `(${params}) => ${body}`
  }
  if (expression.type === 'UnaryExpression') {
    const argument = print(expression.argument)
    if (postfixUnaryOperators.includes(expression.operator)) {
      return argument + expression.operator
    }
    if (expression.operator === 'await') {
      return expression.operator + ' ' + argument
    }
    return expression.operator + argument
  }
  if (expression.type === 'BinaryExpression' || expression.type === 'LogicalExpression') {
    const index = priorizedBinaryOperators.findIndex(p => p.includes(expression.operator))
    const result = print(expression.left, index) + ' ' + expression.operator + ' ' + print(expression.right, index)
    if (index <= priority) {
      return result
    }
    return `(${result})`
  }
  if (expression.type === 'MemberExpression') {
    const object = print(expression.object)
    const property = print(expression.property)
    if (expression.property.type === 'Identifier') {
      if (expression.optional) {
        return object + '?.' + property
      }
      return object + '.' + property
    }
    if (expression.optional) {
      return object + '?.[' + property + ']'
    }
    return object + '[' + property + ']'
  }
  if (expression.type === 'CallExpression') {
    if (expression.optional) {
      return print(expression.callee) + '?.(' + expression.arguments.map((a) => print(a)).join(', ') + ')'
    }
    return print(expression.callee) + '(' + expression.arguments.map((a) => print(a)).join(', ') + ')'
  }
  if (expression.type === 'ConditionalExpression') {
    return print(expression.test) + ' ? ' + print(expression.consequent) + ' : ' + print(expression.alternate)
  }
  if (expression.type === 'Property') {
    if (expression.shorthand) {
      return print(expression.key)
    }
    return print(expression.key) + ': ' + print(expression.value)
  }
  if (expression.type === 'ObjectExpression') {
    if (expression.properties.length === 0) {
      return '{}'
    }
    return '{ ' + expression.properties.map((p) => print(p)).join(', ') + ' }'
  }
  return expression.params.map((p) => print(p)).join(', ')
}
