import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function assignment`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`map([1, 2, undefined], (a = 1, i = 1) => a * a + i)`, t)
  const result = evaluateExpression(ast, {
    map: (array, c) => array.map(c)
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
