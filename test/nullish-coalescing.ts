import test from 'ava'

import { testParser } from './utils'

test('nullish-coalescing', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a??2`, t, {
    disableBabel: true,
    context: {
      a: 0
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
