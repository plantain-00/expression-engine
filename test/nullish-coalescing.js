import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'nullish-coalescing'

test(title, (t) => {
  const tokens = tokenizeExpression(`a??2`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 0
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
