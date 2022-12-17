import test from 'ava'

import { testParser } from './utils'

test('object literal', (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: 1 })`, t, {
    context: {
      b: (c: { a: number }) => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
