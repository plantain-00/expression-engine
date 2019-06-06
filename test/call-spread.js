import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'call spread'

test(title, (t) => {
  const tokens = tokenizeExpression(`a(...b)`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: (...c) => Math.max(...c),
    b: [1, 2, 3]
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
