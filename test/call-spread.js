import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'call spread'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`a(...b)`, t)
  const result = evaluateExpression(ast, {
    a: (...c) => Math.max(...c),
    b: [1, 2, 3]
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
