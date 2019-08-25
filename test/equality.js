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
    const { tokens, ast, printResult } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
