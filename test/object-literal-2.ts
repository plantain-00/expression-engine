import test from 'ava'

import { testParser } from './utils'

const title = 'object literal 2'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: { c: 1 } })`, t, {
    context: {
      b: (c: { a: number }) => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
