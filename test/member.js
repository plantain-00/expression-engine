import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'member expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`a.b.c + 1`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: {
      b: {
        c: 2
      }
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
