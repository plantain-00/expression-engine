import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const tokens = tokenizeExpression(`b({ a: 1 })`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  b: (c: any) => c.a
})
console.info(result)
