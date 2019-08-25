import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'call expression'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`f(1, 2)`, t)
  const result = evaluateExpression(ast, {
    f: (i, j) => i + j * j
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
