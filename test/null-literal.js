import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = `null literal`

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`null`, t)
  const result = evaluateExpression(ast, {})
  t.snapshot({ tokens, ast, result }, { id: title })
})