import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `array literal`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`[a, 2][0]`, t)
  const result = evaluateExpression(ast, {
    a: 3
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
