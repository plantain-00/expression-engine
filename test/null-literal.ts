import test from 'ava'

import { testParser } from './utils'

test(`null literal`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`null`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
