import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'optional chain 2'

test(title, (t) => {
  const tokens = tokenizeExpression(`a?.[0]`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, { a: [1, 2] })
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
