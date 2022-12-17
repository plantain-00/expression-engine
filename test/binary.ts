import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'x + y + z',
  'x - y + z',
  'x + y - z',
  'x - y - z',
  'x + y * z',
  'x + y / z',
  'x * y * z',
  'x * y / z'
]
for (const expression of expressions) {
  test(`binary: ${expression}`, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult })
  })
}
