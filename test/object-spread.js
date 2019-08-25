import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'object spread'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`{a: 1, ...b}`, t)
  const result = evaluateExpression(ast, {
    b: {
      c: 1
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
