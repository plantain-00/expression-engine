import test from 'ava'

import { testParser } from './utils'

test('object literal short hand', (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a })`, t, {
    context: {
      a: 1,
      b: (c: { a: number }) => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
