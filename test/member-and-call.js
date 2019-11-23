import test from 'ava'

import { testParser } from './utils'

const title = 'member expression and call expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b()`, t, {
    babel: true,
    context: {
      a: {
        b: () => 1
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
