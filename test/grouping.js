import test from 'ava'

import { parseExpression, Tokenizer } from '../dist/nodejs'

const expressions = [
  '(1) + (2  ) + 3',
  '4 + 5 * (6)'
]
for (const expression of expressions) {
  const title = `grouping: ${expression}`

  test(title, (t) => {
    const tokens = new Tokenizer(expression).toTokens()
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
