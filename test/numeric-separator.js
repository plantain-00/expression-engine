import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'numeric separator'

test(title, (t) => {
  const tokens = tokenizeExpression(`123_456`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
