import test from 'ava'

import { testParser } from './utils'

const title = 'unary expression not'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`!a`, t, {
    babel: true,
    context: {
      a: true
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
