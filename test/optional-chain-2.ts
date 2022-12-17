import test from 'ava'

import { testParser } from './utils'

test('optional chain 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.[0]`, t, {
    disableBabel: true,
    context: { a: [1, 2] }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
