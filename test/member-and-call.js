import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'member expression and call expression'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`a.b()`, t)
  const result = evaluateExpression(ast, {
    a: {
      b: () => 1
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
