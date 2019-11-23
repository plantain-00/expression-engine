import test from 'ava'

import { testParser } from './utils'

const title = 'unary expression byte not'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`~a`, t, {
    babel: true,
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
