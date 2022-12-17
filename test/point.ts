import test from 'ava'

import { testParser } from './utils'

test('point', (t) => {
  const { tokens, ast, result, printResult } = testParser(`1 + .1`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
