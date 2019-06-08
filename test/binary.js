import test from 'ava'

import { parseWithAcornToo } from './utils'

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
    const { tokens, ast } = parseWithAcornToo(expression, t)
    t.snapshot({ tokens, ast }, { id: title })
  })
}
