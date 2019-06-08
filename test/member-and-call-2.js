import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'member expression and call expression 2'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`a.b()[0]`, t)
  const result = evaluateExpression(ast, {
    a: {
      b: () => [1]
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
