import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'and or not'

test(title, (t) => {
  const tokens = tokenizeExpression(`a > 0 and a < 2`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 1
  })
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
