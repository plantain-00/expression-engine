import test from 'ava'

import { testParser } from './utils'

const title = `null literal`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`null`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
