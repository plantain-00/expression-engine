const test = require('ava')

const { testParser } = require('./utils')

const expressions = [
  'x + y + z',
  'x - y + z',
  'x + y - z',
  'x - y - z',
  'x + y * z',
  'x + y / z',
  'x * y * z',
  'x * y / z'
]
for (const expression of expressions) {
  const title = `binary: ${expression}`

  test(title, (t) => {
    const { tokens, ast, printResult } = testParser(expression, t)
    t.snapshot({ tokens, ast, printResult }, { id: title })
  })
}
