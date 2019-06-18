import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const expressions = ['0x123', '0b101', '0o123', '2e2', '2E-2']
for (const expression of expressions) {
  const title = `number literal: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    const result = evaluateExpression(ast, {})
    t.snapshot({ tokens, ast, result }, { id: title })
  })
}
