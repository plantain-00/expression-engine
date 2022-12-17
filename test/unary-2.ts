import test from 'ava'

import { testParser } from './utils'

test('unary 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a * -(1 + 2)`, t, {
    context: {
      a: 2
    },
  })
  t.snapshot({ tokens, ast, result, printResult })
})
