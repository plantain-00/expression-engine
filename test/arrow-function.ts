import test from 'ava'

import { testParser } from './utils'

const title = `arrow function`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], a => a * a)`, t, {
    context: {
      map: (array: unknown[], c: () => number) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
