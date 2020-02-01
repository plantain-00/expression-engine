const test = require('ava')

const { testParser } = require('./utils')

const title = `arrow function rest`

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`map([1, 2, 3], (a, ...b) => a * a + b[0])`, t, {
    context: {
      map: (array, c) => array.map((a, i) => c(a, i))
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
