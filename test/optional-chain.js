import test from 'ava'

import { testParser } from './utils'

const title = 'optional chain'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a?.b`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
