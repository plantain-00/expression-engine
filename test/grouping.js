import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = [
  '(1) + (2  ) + 3',
  '4 + 5 * (6)'
]
for (const expression of expressions) {
  const title = `grouping: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
