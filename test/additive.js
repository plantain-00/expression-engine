import test from 'ava'

import { parseExpression, Tokenizer } from '../dist/nodejs'

const expressions = ['x + y', 'x - y', '+ 42', '-42']
for (const expression of expressions) {
  const title = `additive: ${expression}`

  test(title, (t) => {
    const tokens = new Tokenizer(expression).toTokens()
    const ast = parseExpression(tokens)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
