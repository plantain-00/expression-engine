import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'object spread'

test(title, (t) => {
  const tokens = tokenizeExpression(`{a: 1, ...b}`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    b: {
      c: 1
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
