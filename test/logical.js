import test from 'ava'

import { testParser } from './utils'

const title = 'logical expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a > 1 && a < 3 ? 4 : 5`, t, {
    babel: true,
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
