import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'unary expression byte not'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`~a`, t)
  const result = evaluateExpression(ast, {
    a: 123
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
