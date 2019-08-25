import test from 'ava'

import { parseWithAcornToo } from './utils'

const expressions = ['x * y', 'x / y', '+ 42']
for (const expression of expressions) {
  const title = `multiplicative: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
