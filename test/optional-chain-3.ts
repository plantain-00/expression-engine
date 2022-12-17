import test from 'ava'

import { testParser } from './utils'

test('optional chain 3', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.()`, t, {
    disableBabel: true,
    context: { a: () => 1 }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
