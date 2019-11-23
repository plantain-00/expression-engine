import test from 'ava'

import { testParser } from './utils'

const title = `arrow function 6`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`(...a) => a`, t, {
    babel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
