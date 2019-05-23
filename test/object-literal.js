import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'object literal'

test(title, (t) => {
  const tokens = tokenizeExpression(`b({ a: 1 })`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    b: c => c.a
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
