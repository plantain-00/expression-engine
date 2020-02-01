const test = require('ava')

const { testParser } = require('./utils')

const expressions = ['x + y', 'x - y', '+ 42', '-42']
for (const expression of expressions) {
  const title = `additive: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
