const test = require('ava')

const { testParser } = require('./utils')

const title = 'member expression 2'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a[b.c]`, t, {
    context: {
      a: {
        d: 2
      },
      b: {
        c: 'd'
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
