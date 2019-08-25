import test from 'ava'

import { parseExpression, tokenizeExpression, evaluateExpression, printExpression } from '../dist/nodejs'

const title = 'binary pipeline operator'

test(title, (t) => {
  const tokens = tokenizeExpression(`a |> double |> (_ => add(7, _))`)
  const ast = parseExpression(tokens)
  const result = evaluateExpression(ast, {
    a: 25,
    double: x => x + x,
    add: (x, y) => x + y
  })
  const printResult = printExpression(ast)
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
