import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = `await`

test(title, async (t) => {
  const tokens = tokenizeExpression(`1 + await a(2)`)
  const ast = parseExpression(tokens)
  const result = await evaluateExpression(ast, {
    a: async (b) => b,
  })
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
