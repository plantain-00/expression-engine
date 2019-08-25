import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function 2`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`map([1, 2, 3], (a, i) => a * a + i)`, t)
  const result = evaluateExpression(ast, {
    map: (array, c) => array.map(c)
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
