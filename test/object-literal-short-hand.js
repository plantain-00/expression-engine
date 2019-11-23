import test from 'ava'

import { testParser } from './utils'

const title = 'object literal short hand'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a })`, t, {
    babel: true,
    context: {
      a: 1,
      b: c => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
