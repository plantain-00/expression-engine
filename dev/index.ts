import { parseExpression as babelParseExpression } from '@babel/parser'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const expression = `{}`
let now = Date.now()
const acronResult = babelParseExpression(expression, { ranges: true })
console.info(Date.now() - now)
console.info(JSON.stringify(acronResult, null, 2))
now = Date.now()
const tokens = tokenizeExpression(expression)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(Date.now() - now)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  b: {
    c: 1
  }
})
console.info(result)
