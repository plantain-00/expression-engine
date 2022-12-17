import test from 'ava'

import { testParser } from './utils'

test(`array literal`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[a, 2][0]`, t, {
    context: {
      a: 3
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
