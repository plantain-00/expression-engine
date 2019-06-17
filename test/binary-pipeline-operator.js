import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../dist/nodejs'

const title = 'binary pipeline operator'

test(title, (t) => {
  const tokens = tokenizeExpression(`a |> double |> (_ => add(7, _))`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 25,
    double: x => x + x,
    add: (x, y) => x + y
  })
  t.snapshot({ tokens, ast, result }, { id: title })
})
