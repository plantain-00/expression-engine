import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'array index'

test(title, (t) => {
  const tokens = tokenizeExpression(`a[0]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: [1, 2]
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
