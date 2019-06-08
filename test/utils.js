const { parseExpression: babelParseExpression } = require('@babel/parser')
const { parseExpression, tokenizeExpression } = require('../dist/nodejs')

/**
 * @param {string} expression
 * @param {import('ava').Assertions} t
 */
function parseWithAcornToo (expression, t) {
  const babelStartMoment = process.hrtime.bigint()
  const raw = babelParseExpression(expression, { ranges: true })
  const babelTime = process.hrtime.bigint() - babelStartMoment
  const babelAst = transformAst(raw)

  const thisStartMoment = process.hrtime.bigint()
  const tokens = tokenizeExpression(expression)
  const ast = parseExpression(tokens)
  const thisTime = process.hrtime.bigint() - thisStartMoment

  if (thisTime > babelTime) {
    console.info(Math.round(Number(thisTime) * 100 / Number(babelTime)) * 0.01, expression, babelTime, thisTime)
  }
  // t.assert(thisTime - babelTime <= 0)

  t.deepEqual(ast, babelAst)

  return { tokens, ast }
}

const properties = [
  'start',
  'end',
  'comments',
  'loc',
  'extra',
  'prefix',
  'computed',
  'method'
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

exports.parseWithAcornToo = parseWithAcornToo
