import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = `null literal`

test(title, (t) => {
  const tokens = tokenizeExpression(`null`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result }, { id: title })
})
