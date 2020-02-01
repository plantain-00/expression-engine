const test = require('ava')

const { testParser } = require('./utils')

const title = 'unary expression percent'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a%`, t, {
    disableBabel: true,
    disablePegjs: true,
    context: {
      a: 123
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
