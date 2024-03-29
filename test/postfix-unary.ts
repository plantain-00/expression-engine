import test from 'ava'

import { testParser } from './utils'

const expressions = [
  '1+2%',
  '1%+2',
]
for (const expression of expressions) {
  test(`postfix unary: ${expression}`, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      disableBabel: true,
      disablePegjs: true,
      context: {}
    })
    t.snapshot({ tokens, ast, result, printResult })
  })
}
