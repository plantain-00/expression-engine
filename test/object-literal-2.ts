import test from 'ava'

import { testParser } from './utils'

test('object literal 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: { c: 1 } })`, t, {
    context: {
      b: (c: { a: number }) => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
