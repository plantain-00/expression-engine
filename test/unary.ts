import test from 'ava'

import { testParser } from './utils'

test('unary expression', (t) => {
  const { tokens, ast, result, printResult } = testParser(`-a`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
