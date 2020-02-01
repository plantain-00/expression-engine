const test = require('ava')

const { testParser } = require('./utils')

const title = `arrow function 2`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], (a, i) => a * a + i)`, t, {
    context: {
      map: (array, c) => array.map(c)
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
