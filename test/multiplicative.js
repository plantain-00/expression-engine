import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = ['x * y', 'x / y', '+ 42']
for (const expression of expressions) {
  const title = `multiplicative: ${expression}`

  test(title, (t) => {
    const { tokens, ast } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
