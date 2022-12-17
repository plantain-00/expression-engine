import test from 'ava'

import { testParser } from './utils'

test('member expression and call expression', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b()`, t, {
    context: {
      a: {
        b: () => 1
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
