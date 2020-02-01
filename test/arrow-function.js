const test = require('ava')

const { testParser } = require('./utils')

const title = `arrow function`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], a => a * a)`, t, {
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
