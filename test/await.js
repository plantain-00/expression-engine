const test = require('ava')

const { testParser } = require('./utils')

const title = `await`

test(title, async (t) => {
  const { tokens, ast, result, printResult } = testParser(`1 + await a(2)`, t, {
    disableBabel: true,
    context: {
      a: async (b) => b,
    }
  })
  t.snapshot({ tokens, ast, result: await result, printResult }, { id: title })
})
