import test from 'ava'

import { testParser } from './utils'

test('array index', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a[0]`, t, {
    context: {
      a: [1, 2]
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
