import test from 'ava'

import { parseWithAcornToo } from './utils'

import { evaluateExpression } from '../dist/nodejs'

const expressions = [
  '1+-2',
  '-1+2',
]
for (const expression of expressions) {
  const title = `prefix unary: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = parseWithAcornToo(expression, t)
    const result = evaluateExpression(ast, {})
    t.snapshot({ tokens, ast, result, printResult }, { id: title })
  })
}
