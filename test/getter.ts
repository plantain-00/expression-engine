import test from 'ava'

import { testParser } from './utils'

const title = 'getter'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b`, t, {
    context: {
      a: {
        get b() {
          return 1
        }
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
