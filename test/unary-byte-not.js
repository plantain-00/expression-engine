const test = require('ava')

const { testParser } = require('./utils')

const title = 'unary expression byte not'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`~a`, t, {
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
