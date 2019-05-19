import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'conditional expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`a.width > a.height ? 'row' : 'column'`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: { width: 2, height: 1 }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
