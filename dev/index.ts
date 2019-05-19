import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const tokens = tokenizeExpression(`a[0]`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  a: [1, 2]
})
console.info(result)
