import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'a || b && c == g < h + j * k',
  'a + (b < (c * d)) + e'
]
for (const expression of expressions) {
  test(`complex: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
