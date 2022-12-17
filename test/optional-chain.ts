import test from 'ava'

import { testParser } from './utils'

test('optional chain', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.b`, t, {
    disableBabel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
