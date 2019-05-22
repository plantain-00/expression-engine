import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'and or not'

test(title, (t) => {
  const tokens = tokenizeExpression(`a > 0 and a < 2`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 1
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
