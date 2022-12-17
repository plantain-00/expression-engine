import test from 'ava'

import { testParser } from './utils'

const expressions = [
  '(1) + (2  ) + 3',
  '4 + 5 * (6)'
]
for (const expression of expressions) {
  test(`grouping: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
