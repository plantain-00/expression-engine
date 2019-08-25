import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'boolean literal'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`true ? false : true`, t)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
