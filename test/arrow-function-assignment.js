const test = require('ava')

const { testParser } = require('./utils')

const title = `arrow function assignment`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, undefined], (a = 1, i = 1) => a * a + i)`, t, {
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
