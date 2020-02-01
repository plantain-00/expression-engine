const test = require('ava')

const { testParser } = require('./utils')

const title = 'object literal'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: 1 })`, t, {
    context: {
      b: c => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
