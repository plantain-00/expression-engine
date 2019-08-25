import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'logical expression'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`a > 1 && a < 3 ? 4 : 5`, t)
  const result = evaluateExpression(ast, {
    a: 2
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
