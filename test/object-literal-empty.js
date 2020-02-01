const test = require('ava')

const { testParser } = require('./utils')

const title = 'object literal empty'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`{}`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
