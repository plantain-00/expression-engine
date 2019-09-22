import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function 3`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`map([1, 2, 3], a => a > 1 ? 1 : 2)`, t)
  const result = evaluateExpression(ast, {
    map: (array, c) => array.map(c)
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
