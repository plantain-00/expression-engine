const test = require('ava')

const { testParser } = require('./utils')

const title = 'optional chain 4'

test(title, (t) => {
  const { tokens, ast, result, printResult } = testParser(`{ count:'1', price: commodity?.prices?.[0], width:302 }`, t, {
    disableBabel: true,
    context: {}
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
