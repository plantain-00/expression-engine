import test from 'ava'

import { testParser } from './utils'

const expressions = ['a & b', 'a | b', 'a ^ b', 'a >> b', 'a << b', 'a >>> b']
for (const expression of expressions) {
  test(`binary byte: ${expression}`, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      context: {
        a: 100,
        b: 1
      }
    })
    t.snapshot({ tokens, ast, result, printResult })
  })
}
