import test from 'ava'

import { parseExpression, Tokenizer } from '../dist/nodejs'

const expressions = [
  'a || b && c == g < h + j * k',
  'a + (b < (c * d)) + e'
]
for (const expression of expressions) {
  const title = `complex: ${expression}`

  test(title, (t) => {
    const tokens = new Tokenizer(expression).toTokens()
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
