import { parseExpression as babelParseExpression } from '@babel/parser'

import { parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const expression = `map([1, 2, undefined], (a = 1, i = 1) => a * a + i)`
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
  map: (array: number[], c: (a: number, index: number) => number) => array.map(c)
})
console.info(result)
