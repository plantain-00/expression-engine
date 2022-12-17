import test from 'ava'

import { testParser } from './utils'

const expressions = ['x + y', 'x - y', '+ 42', '-42']
for (const expression of expressions) {
  test(`additive: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
