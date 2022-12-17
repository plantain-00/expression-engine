import test from 'ava'

import { testParser } from './utils'

test('getter', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b`, t, {
    context: {
      a: {
        get b() {
          return 1
        }
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
