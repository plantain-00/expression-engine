import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'unary expression not'

test(title, (t) => {
  const tokens = tokenizeExpression(`!a`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: true
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
