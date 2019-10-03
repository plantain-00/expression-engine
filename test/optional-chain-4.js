import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'optional chain 4'

test(title, (t) => {
  const tokens = tokenizeExpression(`{ count:'1', price: commodity?.prices?.[0], width:302 }`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {})
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
