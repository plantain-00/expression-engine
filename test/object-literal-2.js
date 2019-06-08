import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'object literal 2'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`b({ a: { c: 1 } })`, t)
  const result = evaluateExpression(ast, {
    b: c => c.a
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
