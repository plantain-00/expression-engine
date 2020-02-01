const test = require('ava')

const { testParser } = require('./utils')

const title = `array literal empty`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[]`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
