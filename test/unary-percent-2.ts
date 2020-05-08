import test from 'ava'

import { testParser } from './utils'

const title = 'unary expression percent 2'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`-a%`, t, {
    disableBabel: true,
    disablePegjs: true,
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
