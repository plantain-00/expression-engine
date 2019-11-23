import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'y ? 1 : 2',
  'x && y ? 1 : 2',
  'x == (0) ? 1 : 2'
]
for (const expression of expressions) {
  const title = `condition: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
