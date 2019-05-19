import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'logical expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`a > 1 && a < 3 ? 4 : 5`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 2
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
