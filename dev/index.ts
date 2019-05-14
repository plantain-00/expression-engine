import { parseExpression, Tokenizer } from '../src'

const tokens = new Tokenizer(`a['b']`).toTokens()
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
