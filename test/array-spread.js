import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'array spread'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`[1, ...b, 2]`, t)
  const result = evaluateExpression(ast, {
    b: [1, 2, 3]
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
