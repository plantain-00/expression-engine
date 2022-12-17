import test from 'ava'

import { testParser } from './utils'

test('boolean literal', (t) => {
  const { tokens, ast, result, printResult } = testParser(`true ? false : true`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
