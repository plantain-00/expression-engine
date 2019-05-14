import test from 'ava'

import { parseExpression, Tokenizer } from '../dist/nodejs'

const expressions = [
  'x < y',
  'x > y',
  'x <= y',
  'x >= y',
  'x < y < z'
]
for (const expression of expressions) {
  const title = `relational: ${expression}`

  test(title, (t) => {
    const tokens = new Tokenizer(expression).toTokens()
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
