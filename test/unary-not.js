import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'unary expression not'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`!a`, t)
  const result = evaluateExpression(ast, {
    a: true
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
