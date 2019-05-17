import test from 'ava'

import { parseExpression, tokenizeExpression } from '../dist/nodejs'

const expressions = [
  'x == y',
  'x != y'
]
for (const expression of expressions) {
  const title = `equality: ${expression}`

  test(title, (t) => {
    const tokens = tokenizeExpression(expression)
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
