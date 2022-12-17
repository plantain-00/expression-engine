import test from 'ava'

import { testParser } from './utils'

test('point 2', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a[0].b`, t, {
    context: {
      a: [
        {
          b: 2
        }
      ]
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
