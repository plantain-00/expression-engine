import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = `array literal empty`

test(title, (t) => {
  const tokens = tokenizeExpression(`[]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result }, { id: title })
})
