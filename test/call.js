import test from 'ava'

import { testParser } from './utils'

const title = 'call expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`f(1, 2)`, t, {
    context: {
      f: (i, j) => i + j * j
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
