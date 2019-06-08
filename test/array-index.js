import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'array index'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`a[0]`, t)
  const result = evaluateExpression(ast, {
    a: [1, 2]
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
