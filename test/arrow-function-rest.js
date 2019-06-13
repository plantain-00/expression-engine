import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function rest`

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`map([1, 2, 3], (a, ...b) => a * a + b[0])`, t)
  const result = evaluateExpression(ast, {
    map: (array, c) => array.map((a, i) => c(a, i))
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
