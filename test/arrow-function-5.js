import test from 'ava'

import { testParser } from './utils'

const title = `arrow function 5`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`(a = 1) => a`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
