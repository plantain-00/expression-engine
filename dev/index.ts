import { parseExpression as babelParseExpression } from '@babel/parser'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const expression = `123_456`
let babelStartMoment = process.hrtime.bigint()
const acronResult = babelParseExpression(expression, { ranges: true })
const babelTime = process.hrtime.bigint() - babelStartMoment
console.info(JSON.stringify(acronResult, null, 2))

const thisStartMoment = process.hrtime.bigint()
const tokens = tokenizeExpression(expression)
console.info(tokens)
const ast = parseExpression(tokens)
const thisTime = process.hrtime.bigint() - thisStartMoment

console.info(Math.round(Number(thisTime) * 100 / Number(babelTime)) * 0.01, babelTime, thisTime)

console.info(JSON.stringify(ast, null, 2))
const result = evaluateExpression(ast, {
  a: 25,
  double: (x: number) => x + x,
  add: (x: number, y: number) => x + y
})
console.info(result)
