import test from 'ava'

import { testParser } from './utils'

test(`array literal empty`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[]`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
