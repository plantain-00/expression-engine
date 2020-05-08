import test from 'ava'

import { testParser } from './utils'

const title = 'optional chain 2'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.[0]`, t, {
    disableBabel: true,
    context: { a: [1, 2] }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
