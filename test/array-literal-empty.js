import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `array literal empty`

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`[]`, t)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
