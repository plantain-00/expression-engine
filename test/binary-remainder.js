import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'binary remainder'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`a%2`, t)
  const result = evaluateExpression(ast, {
    a: 3
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
