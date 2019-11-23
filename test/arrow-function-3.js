import test from 'ava'

import { testParser } from './utils'

const title = `arrow function 3`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], a => a > 1 ? 1 : 2)`, t, {
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
