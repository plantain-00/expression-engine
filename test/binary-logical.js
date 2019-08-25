import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = [
  'x || y',
  'x && y',
  'x || y || z',
  'x && y && z',
  'x || y && z'
]
for (const expression of expressions) {
  const title = `binary logical: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
