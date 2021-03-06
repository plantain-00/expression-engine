import test from 'ava'

import { testParser } from './utils'

const title = 'boolean literal'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`true ? false : true`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
