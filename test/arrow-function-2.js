import test from 'ava'

import { testParser } from './utils'

const title = `arrow function 2`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], (a, i) => a * a + i)`, t, {
    babel: true,
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
