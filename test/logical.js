const test = require('ava')

const { testParser } = require('./utils')

const title = 'logical expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a > 1 && a < 3 ? 4 : 5`, t, {
    context: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
