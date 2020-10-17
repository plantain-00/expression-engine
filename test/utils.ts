import { parseExpression as babelParseExpression } from '@babel/parser'
import { parseExpression, tokenizeExpression, evaluateExpression, printExpression, Expression } from '../src'
const { parse: pegJsParse } = require('../dist/expression-parser.peg')
import { Assertions } from 'ava'

export function testParser (expression: string, t: Assertions, options?: { context?: any, disableBabel?: boolean, disablePegjs?: boolean }) {
  options = { ...options }

  const thisStartMoment = process.hrtime.bigint()
  const tokens = tokenizeExpression(expression)
  const ast = parseExpression(tokens)
  const thisTime = process.hrtime.bigint() - thisStartMoment

  if (!options.disableBabel) {
    const babelStartMoment = process.hrtime.bigint()
    const raw = babelParseExpression(expression, { ranges: true })
    const babelTime = process.hrtime.bigint() - babelStartMoment
    const babelAst = transformAst(raw) as unknown as Expression
  
    if (thisTime > babelTime) {
      console.info(Math.round(Number(thisTime) * 100 / Number(babelTime)) / 100, expression, babelTime, thisTime)
    }
    // t.assert(thisTime - babelTime <= 0)
  
    t.deepEqual(ast, babelAst)
  }
  
  if (!options.disablePegjs) {
    const pegJsAst = pegJsParse(expression)
    t.deepEqual(ast, pegJsAst)
  }

  const result = options.context ? evaluateExpression(ast, options.context) : undefined

  const printResult = printExpression(ast)

  return { tokens, ast, result, printResult }
}

const properties = [
  'start',
  'end',
  'comments',
  'loc',
  'extra',
  'prefix',
  'computed',
  'method',
  'id',
  'generator',
  'async',
  'errors',
  'leadingComments',
  'trailingComments',
  'innerComments'
]

function transformAst (expression: { [key: string]: any }) {
  const result: { [key: string]: unknown } = {}
  for (const key in expression) {
    if (!properties.includes(key)) {
      let value = expression[key]
      if (value === 'ObjectProperty') {
        value = 'Property'
      }
      if (Array.isArray(value)) {
        result[key] = value.map((v) => v.type ? transformAst(v) : v)
      } else if (value.type) {
        result[key] = transformAst(value)
      } else {
        result[key] = value
      }
    }
  }
  return result
}
