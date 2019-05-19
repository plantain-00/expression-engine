import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'member expression and call expression 2'

test(title, (t) => {
  const tokens = tokenizeExpression(`a.b()[0]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: {
      b: () => [1]
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
