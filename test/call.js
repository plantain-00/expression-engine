import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'call expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`f(1, 2)`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    f: (i, j) => i + j * j
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
