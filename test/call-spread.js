const test = require('ava')

const { testParser } = require('./utils')

const title = 'call spread'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a(...b)`, t, {
    context: {
      a: (...c) => Math.max(...c),
      b: [1, 2, 3]
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
