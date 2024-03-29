import test from 'ava'

import { testParser } from './utils'

test(`await`, async (t) => {
  const { tokens, ast, result, printResult } = testParser(`1 + await a(2)`, t, {
    disableBabel: true,
    context: {
      a: async (b: number) => b,
    }
  })
  t.snapshot({ tokens, ast, result: await result, printResult })
})
