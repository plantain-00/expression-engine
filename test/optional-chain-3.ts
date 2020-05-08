import test from 'ava'

import { testParser } from './utils'

const title = 'optional chain 3'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.()`, t, {
    disableBabel: true,
    context: { a: () => 1 }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
