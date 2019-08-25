import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'nullish-coalescing'

test(title, (t) => {
  const tokens = tokenizeExpression(`a??2`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 0
  })
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
