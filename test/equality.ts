import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'x == y',
  'x != y',
  'x === y',
  'x!==y'
]
for (const expression of expressions) {
  test(`equality: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
