import test from 'ava'

import { testParser } from './utils'

const title = `await`

test(title, async (t) => {
  const { tokens, ast, result, printResult } = testParser(`1 + await a(2)`, t, {
    context: {
      a: async (b) => b,
    }
  })
  t.snapshot({ tokens, ast, result: await result, printResult }, { id: title })
})
