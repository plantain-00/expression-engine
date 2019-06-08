import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = [
  'a || b && c == g < h + j * k',
  'a + (b < (c * d)) + e'
]
for (const expression of expressions) {
  const title = `complex: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
