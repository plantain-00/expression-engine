import test from 'ava'

import { testParser } from './utils'

test('logical expression', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a > 1 && a < 3 ? 4 : 5`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
