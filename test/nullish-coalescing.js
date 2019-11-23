import test from 'ava'

import { testParser } from './utils'

const title = 'nullish-coalescing'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a??2`, t, {
    context: {
      a: 0
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
