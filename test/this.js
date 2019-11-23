import test from 'ava'

import { testParser } from './utils'

const title = 'this expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`this.a`, t, {
    context: {
      this: {
        a: 2
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
