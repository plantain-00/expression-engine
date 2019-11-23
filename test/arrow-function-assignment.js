import test from 'ava'

import { testParser } from './utils'

const title = `arrow function assignment`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, undefined], (a = 1, i = 1) => a * a + i)`, t, {
    babel: true,
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
