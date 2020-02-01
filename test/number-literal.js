const test = require('ava')

const { testParser } = require('./utils')

const expressions = ['0x123', '0b101', '0o123', '2e2', '2E-2']
for (const expression of expressions) {
  const title = `number literal: ${expression}`

  test(title, (t) => {
    const { tokens, ast, result, printResult } = testParser(expression, t, {
      context: {}
    })
    t.snapshot({ tokens, ast, result, printResult }, { id: title })
  })
}
