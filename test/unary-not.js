const test = require('ava')

const { testParser } = require('./utils')

const title = 'unary expression not'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`!a`, t, {
    context: {
      a: true
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
