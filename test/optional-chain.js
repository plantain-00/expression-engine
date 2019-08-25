import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'optional chain'

test(title, (t) => {
  const tokens = tokenizeExpression(`a?.b`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
