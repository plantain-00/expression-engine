import test from 'ava'

import { testParser } from './utils'

const title = 'binary pipeline operator'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a |> double |> (_ => add(7, _))`, t, {
    context: {
      a: 25,
      double: x => x + x,
      add: (x, y) => x + y
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
