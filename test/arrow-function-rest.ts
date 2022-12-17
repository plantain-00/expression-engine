import test from 'ava'

import { testParser } from './utils'

test(`arrow function rest`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], (a, ...b) => a * a + b[0])`, t, {
    context: {
      map: (array: unknown[], c: (item: unknown, i: number) => number) => array.map((a, i) => c(a, i))
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
