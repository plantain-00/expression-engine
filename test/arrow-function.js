import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function`

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`map([1, 2, 3], a => a * a)`, t)
  const result = evaluateExpression(ast, {
    map: (array, c) => array.map(c)
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
