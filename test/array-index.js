const test = require('ava')

const { testParser } = require('./utils')

const title = 'array index'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a[0]`, t, {
    context: {
      a: [1, 2]
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
