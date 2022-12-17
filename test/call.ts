import test from 'ava'

import { testParser } from './utils'

test('call expression', (t) => {
  const { tokens, ast, result, printResult } = testParser(`f(1, 2)`, t, {
    context: {
      f: (i: number, j: number) => i + j * j
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
