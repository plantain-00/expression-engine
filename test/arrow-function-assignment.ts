import test from 'ava'

import { testParser } from './utils'

test(`arrow function assignment`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, undefined], (a = 1, i = 1) => a * a + i)`, t, {
    context: {
      map: (array: unknown[], c: () => number) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
