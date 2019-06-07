import { parseExpressionAt } from 'acorn'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const expression = `{a: 1, ...b}`
console.info(JSON.stringify(parseExpressionAt(expression), null, 2))
const tokens = tokenizeExpression(expression)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  b: {
    c: 1
  }
})
console.info(result)
