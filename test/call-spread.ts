import test from 'ava'

import { testParser } from './utils'

test('call spread', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a(...b)`, t, {
    context: {
      a: (...c: number[]) => Math.max(...c),
      b: [1, 2, 3]
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
