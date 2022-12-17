import test from 'ava'

import { testParser } from './utils'

test('object spread', (t) => {
  const { tokens, ast, result, printResult } = testParser(`{a: 1, ...b}`, t, {
    context: {
      b: {
        c: 1
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
