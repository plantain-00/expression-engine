import test from 'ava'

import { testParser } from './utils'

test('member expression and call expression 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b()[0]`, t, {
    context: {
      a: {
        b: () => [1]
      }
    },
    disablePegjs: true // todo
  })
  t.snapshot({ tokens, ast, result, printResult })
})
