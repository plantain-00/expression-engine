const test = require('ava')

const { testParser } = require('./utils')

const title = 'numeric separator'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`123_456`, t, {
    disableBabel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
