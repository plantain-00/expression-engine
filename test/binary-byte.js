import test from 'ava'

import { testParser } from './utils'

const expressions = ['a & b', 'a | b', 'a ^ b', 'a >> b', 'a << b', 'a >>> b']
for (const expression of expressions) {
  const title = `binary byte: ${expression}`

  test(title, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      babel: true,
      context: {
        a: 100,
        b: 1
      }
    })
    t.snapshot({ tokens, ast, result, printResult }, { id: title })
  })
}
