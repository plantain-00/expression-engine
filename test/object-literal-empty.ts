import test from 'ava'

import { testParser } from './utils'

test('object literal empty', (t) => {
  const { tokens, ast, result, printResult } = testParser(`{}`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
