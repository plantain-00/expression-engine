import test from 'ava'

import { testParser } from './utils'

test(`arrow function 6`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`(...a) => a`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
