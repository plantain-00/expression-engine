import test from 'ava'

import { testParser } from './utils'

const expressions = ['0x123', '0b101', '0o123', '2e2', '2E-2']
for (const expression of expressions) {
  test(`number literal: ${expression}`, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      context: {}
    })
    t.snapshot({ tokens, ast, result, printResult })
  })
}
