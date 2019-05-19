import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'unary expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`-a`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 2
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
