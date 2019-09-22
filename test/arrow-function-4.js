import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function 4`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`[1, 2, 3].map(a => a + 1)`, t)
  const result = evaluateExpression(ast, {
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
