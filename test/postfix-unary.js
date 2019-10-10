import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const expressions = [
  '1+2%',
  '1%+2',
]
for (const expression of expressions) {
  const title = `postfix unary: ${expression}`

  test(title, (t) => {
    const tokens = tokenizeExpression(expression)
    const ast = parseExpression(tokens)
    const result = evaluateExpression(ast, {})
    const printResult = printExpression(ast)
    t.snapshot({ tokens, ast, result, printResult }, { id: title })
  })
}
