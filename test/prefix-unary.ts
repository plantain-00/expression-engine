import test from 'ava'

import { testParser } from './utils'

const expressions = [
  '1+-2',
  '-1+2',
]
for (const expression of expressions) {
  test(`prefix unary: ${expression}`, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      context: {}
    })
    t.snapshot({ tokens, ast, result, printResult })
  })
}
