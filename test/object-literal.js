import test from 'ava'

import { testParser } from './utils'

const title = 'object literal'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: 1 })`, t, {
    babel: true,
    context: {
      b: c => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
