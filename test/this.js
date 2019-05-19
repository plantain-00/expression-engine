import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'this expression'

test(title, (t) => {
  const tokens = tokenizeExpression(`this.a`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    this: {
      a: 2
    }
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
