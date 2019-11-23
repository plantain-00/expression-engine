import test from 'ava'

import { testParser } from './utils'

const expressions = [
  'x == y',
  'x != y',
  'x === y',
  'x!==y'
]
for (const expression of expressions) {
  const title = `equality: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t, {
      babel: true
    })
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
