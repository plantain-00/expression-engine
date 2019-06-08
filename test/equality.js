import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = [
  'x == y',
  'x != y',
  'x === y',
  'x!==y'
]
for (const expression of expressions) {
  const title = `equality: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
