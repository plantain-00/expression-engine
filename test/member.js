const test = require('ava')

const { testParser } = require('./utils')

const title = 'member expression'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`a.b.c + 1`, t, {
    context: {
      a: {
        b: {
          c: 2
        }
      }
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
