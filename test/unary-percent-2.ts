import test from 'ava'

import { testParser } from './utils'

test('unary expression percent 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`-a%`, t, {
    disableBabel: true,
    disablePegjs: true,
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
