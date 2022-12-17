import test from 'ava'

import { testParser } from './utils'

test(`arrow function 4`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[1, 2, 3].map(a => a + 1)`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
