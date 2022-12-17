import test from 'ava'

import { testParser } from './utils'

test('unary expression byte not', (t) => {
  const { tokens, ast, result, printResult } = testParser(`~a`, t, {
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
