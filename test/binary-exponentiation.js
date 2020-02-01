const test = require('ava')

const { testParser } = require('./utils')

const title = `binary exponentiation`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a ** 2`, t, {
    context: {
      a: 3
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
