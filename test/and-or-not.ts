import test from 'ava'

import { testParser } from './utils'

test('and or not', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a > 0 and a < 2`, t, {
    disableBabel: true,
    context: {
      a: 1
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
