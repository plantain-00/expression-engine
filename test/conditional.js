import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'conditional expression'

test(title, (t) => {
  const { tokens, ast, printResult } = parseWithAcornToo(`a.width > a.height ? 'row' : 'column'`, t)
  const result = evaluateExpression(ast, {
    a: { width: 2, height: 1 }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
