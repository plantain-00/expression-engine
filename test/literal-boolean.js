import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'boolean literal'

test(title, (t) => {
  const tokens = tokenizeExpression(`true ? false : true`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result }, { id: title })
})
