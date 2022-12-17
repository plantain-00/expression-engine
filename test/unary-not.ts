import test from 'ava'

import { testParser } from './utils'

test('unary expression not', (t) => {
  const { tokens, ast, result, printResult } = testParser(`!a`, t, {
    context: {
      a: true
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
