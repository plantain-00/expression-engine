const test = require('ava')

const { testParser } = require('./utils')

const title = 'member expression and call expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b()`, t, {
    context: {
      a: {
        b: () => 1
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
