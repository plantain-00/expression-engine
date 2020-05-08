import test from 'ava'

import { testParser } from './utils'

const title = 'unary expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`-a`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
