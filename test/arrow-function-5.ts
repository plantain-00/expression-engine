import test from 'ava'

import { testParser } from './utils'

test(`arrow function 5`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`(a = 1) => a`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
