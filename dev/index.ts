import { parseExpression, Tokenizer } from '../src'

const tokens = new Tokenizer('').toTokens()
console.info(tokens)
const ast = parseExpression(tokens)
console.info(JSON.stringify(ast, null, 2))
