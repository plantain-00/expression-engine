import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const expressions = ['a & b', 'a | b', 'a ^ b', 'a >> b', 'a << b', 'a >>> b']
for (const expression of expressions) {
  const title = `binary byte: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    const result = evaluateExpression(ast, {
      a: 100,
      b: 1
    })
    t.snapshot({ tokens, ast, result }, { id: title })
  })
}
