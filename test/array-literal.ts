import test from 'ava'

import { testParser } from './utils'

const title = `array literal`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[a, 2][0]`, t, {
    context: {
      a: 3
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
