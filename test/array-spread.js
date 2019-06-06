import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'array spread'

test(title, (t) => {
  const tokens = tokenizeExpression(`[1, ...b, 2]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    b: [1, 2, 3]
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
