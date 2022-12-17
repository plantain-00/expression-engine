import test from 'ava'

import { testParser } from './utils'

test(`arrow function 3`, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], a => a > 1 ? 1 : 2)`, t, {
    context: {
      map: (array: unknown[], c: () => number) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
