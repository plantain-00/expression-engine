import test from 'ava'

import { testParser } from './utils'

test('member expression', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b.c + 1`, t, {
    context: {
      a: {
        b: {
          c: 2
        }
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
