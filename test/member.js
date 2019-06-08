import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'member expression'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`a.b.c + 1`, t)
  const result = evaluateExpression(ast, {
    a: {
      b: {
        c: 2
      }
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
