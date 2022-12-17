import test from 'ava'

import { testParser } from './utils'

test('member expression 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a[b.c]`, t, {
    context: {
      a: {
        d: 2
      },
      b: {
        c: 'd'
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
