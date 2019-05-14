import test from 'ava'

import { parseExpression, Tokenizer } from '../dist/nodejs'

const expressions = [
  'y ? 1 : 2',
  'x && y ? 1 : 2',
  'x == (0) ? 1 : 2'
]
for (const expression of expressions) {
  const title = `condition: ${expression}`

  test(title, (t) => {
    const tokens = new Tokenizer(expression).toTokens()
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
