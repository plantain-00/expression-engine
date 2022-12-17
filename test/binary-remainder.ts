import test from 'ava'

import { testParser } from './utils'

test('binary remainder', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a%2`, t, {
    context: {
      a: 3
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
