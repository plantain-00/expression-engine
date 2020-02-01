const test = require('ava')

const { testParser } = require('./utils')

const title = `null literal`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`null`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
