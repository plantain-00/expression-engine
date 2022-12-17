import test from 'ava'

import { testParser } from './utils'

test('optional chain 4', (t) => {
  const { tokens, ast, result, printResult } = testParser(`{ count:'1', price: commodity?.prices?.[0], width:302 }`, t, {
    disableBabel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult })
})
