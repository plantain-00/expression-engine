import test from 'ava'

import { testParser } from './utils'

const title = 'conditional expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.width > a.height ? 'row' : 'column'`, t, {
    context: {
      a: { width: 2, height: 1 }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
