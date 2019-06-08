import test from 'ava'

import { evaluateExpression } from '../dist/nodejs'
import { parseWithAcornToo } from './utils'

const title = 'this expression'

test(title, (t) => {
  const { tokens, ast } = parseWithAcornToo(`this.a`, t)
  const result = evaluateExpression(ast, {
    this: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
