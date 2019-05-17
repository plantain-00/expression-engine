import { parseExpression, tokenizeExpression } from '../src'

const tokens = tokenizeExpression(`a['b']`)
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
