const test = require('ava')

const { testParser } = require('./utils')

const title = `arrow function 4`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`[1, 2, 3].map(a => a + 1)`, t, {
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
