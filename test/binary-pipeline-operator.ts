import test from 'ava'

import { testParser } from './utils'

test('binary pipeline operator', (t) => {
  const { tokens, ast, result, printResult } = testParser(`a |> double |> (_ => add(7, _))`, t, {
    disableBabel: true,
    context: {
      a: 25,
      double: (x: number) => x + x,
      add: (x: number, y: number) => x + y
    }
  })
  t.snapshot({ tokens, ast, result, printResult })
})
