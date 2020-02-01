const test = require('ava')

const { testParser } = require('./utils')

const title = 'object literal 2'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`b({ a: { c: 1 } })`, t, {
    context: {
      b: c => c.a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
