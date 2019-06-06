import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const tokens = tokenizeExpression(`a(...b)`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  a: (...c: number[]) => Math.max(...c),
  b: [1, 2, 3]
})
console.info(result)
