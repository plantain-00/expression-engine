import test from 'ava'

import { testParser } from './utils'

const title = 'binary remainder'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a%2`, t, {
    babel: true,
    context: {
      a: 3
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
