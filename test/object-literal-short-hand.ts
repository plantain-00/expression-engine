import test from 'ava'

import { testParser } from './utils'

const title = 'object literal short hand'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a })`, t, {
    context: {
      a: 1,
      b: (c: { a: number }) => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
