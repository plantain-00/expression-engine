import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'object literal short hand'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`b({ a })`, t)
  const result = evaluateExpression(ast, {
    a: 1,
    b: c => c.a
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
