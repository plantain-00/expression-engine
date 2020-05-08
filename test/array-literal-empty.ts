import test from 'ava'

import { testParser } from './utils'

const title = `array literal empty`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[]`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
