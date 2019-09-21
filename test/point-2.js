import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'point 2'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`a[0].b`, t)
  const result = evaluateExpression(ast, {
    a: [
      {
        b: 2
      }
    ]
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
