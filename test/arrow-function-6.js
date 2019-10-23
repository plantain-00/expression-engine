import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `arrow function 6`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`(...a) => a`, t)
  const result = evaluateExpression(ast, {
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
