const { parse } = require('../dist/expression-parser.peg')
const ast = parse('null')
console.info(JSON.stringify(ast, null, 2))
