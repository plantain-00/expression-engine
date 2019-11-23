const { parseExpression: babelParseExpression } = require('@babel/parser')
const { parseExpression, tokenizeExpression, evaluateExpression, printExpression } = require('../dist/nodejs')

/**
 * @param {string} expression
 * @param {import('ava').Assertions} t
 * @param {{ context?: any, disableBabel?: boolean }} options
 */
function testParser (expression, t, options) {
  options = { ...options }

  const thisStartMoment = process.hrtime.bigint()
  const tokens = tokenizeExpression(expression)
  const ast = parseExpression(tokens)
  const thisTime = process.hrtime.bigint() - thisStartMoment

  if (!options.disableBabel) {
    const babelStartMoment = process.hrtime.bigint()
    const raw = babelParseExpression(expression, { ranges: true })
    const babelTime = process.hrtime.bigint() - babelStartMoment
    const babelAst = transformAst(raw)
  
    if (thisTime > babelTime) {
      console.info(Math.round(Number(thisTime) * 100 / Number(babelTime)) * 0.01, expression, babelTime, thisTime)
    }
    // t.assert(thisTime - babelTime <= 0)
  
    t.deepEqual(ast, babelAst)
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
  'errors'
]

function transformAst (expression) {
  const result = {}
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

exports.testParser = testParser
