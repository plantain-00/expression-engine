import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'point'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`1 + .1`, t)
  const result = evaluateExpression(ast, {
    a: 2
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
