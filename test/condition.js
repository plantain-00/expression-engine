import test from 'ava'

import { parseExpression, tokenizeExpression } from '../dist/nodejs'

const expressions = [
  'y ? 1 : 2',
  'x && y ? 1 : 2',
  'x == (0) ? 1 : 2'
]
for (const expression of expressions) {
  const title = `condition: ${expression}`

  test(title, (t) => {
    const tokens = tokenizeExpression(expression)
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
