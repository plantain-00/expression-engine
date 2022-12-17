import test from 'ava'

import { testParser } from './utils'

test('numeric separator', (t) => {
  const { tokens, ast, result, printResult } = testParser(`123_456`, t, {
    disableBabel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
