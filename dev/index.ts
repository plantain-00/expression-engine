import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const tokens = tokenizeExpression(`a.width > a.height ? 'row' : 'column'`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  a: { width: 2, height: 1 }
})
console.info(result)
