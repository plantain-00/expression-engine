import test from 'ava'

import { testParser } from './utils'

test('array spread', (t) => {
  const { tokens, ast, result, printResult } = testParser(`[1, ...b, 2]`, t, {
    context: {
      b: [1, 2, 3]
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
