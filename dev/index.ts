import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const tokens = tokenizeExpression(`a%2`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  a: 3
})
console.info(result)
