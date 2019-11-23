import test from 'ava'

import { testParser } from './utils'

const title = 'and or not'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a > 0 and a < 2`, t, {
    context: {
      a: 1
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
