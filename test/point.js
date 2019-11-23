import test from 'ava'

import { testParser } from './utils'

const title = 'point'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`1 + .1`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
