import test from 'ava'

import { testParser } from './utils'

const expressions = [
  '(1) + (2  ) + 3',
  '4 + 5 * (6)'
]
for (const expression of expressions) {
  const title = `grouping: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t, {
      babel: true
    })
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
