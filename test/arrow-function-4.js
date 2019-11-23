import test from 'ava'

import { testParser } from './utils'

const title = `arrow function 4`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[1, 2, 3].map(a => a + 1)`, t, {
    babel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
