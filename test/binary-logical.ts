import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'x || y',
  'x && y',
  'x || y || z',
  'x && y && z',
  'x || y && z'
]
for (const expression of expressions) {
  test(`binary logical: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
