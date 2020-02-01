const test = require('ava')

const { testParser } = require('./utils')

const title = 'array spread'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[1, ...b, 2]`, t, {
    context: {
      b: [1, 2, 3]
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
