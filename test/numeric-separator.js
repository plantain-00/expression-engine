import test from 'ava'

import { testParser } from './utils'

const title = 'numeric separator'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`123_456`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
