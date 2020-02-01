const test = require('ava')

const { testParser } = require('./utils')

const title = 'nullish-coalescing'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a??2`, t, {
    disableBabel: true,
    context: {
      a: 0
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
