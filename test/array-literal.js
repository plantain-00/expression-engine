import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = `array literal`

test(title, (t) => {
  const tokens = tokenizeExpression(`[a, 2][0]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 3
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
