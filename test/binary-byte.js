import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const expressions = ['a & b', 'a | b', 'a ^ b', 'a >> b', 'a << b', 'a >>> b']
for (const expression of expressions) {
  const title = `binary byte: ${expression}`

  test(title, (t) => {
    const tokens = tokenizeExpression(expression)
    const ast = parseExpression(tokens)
    const result = evaluateExpression(ast, {
      a: 100,
      b: 1
    })
    t.snapshot({ tokens, ast, result }, { id: title })
  })
}
