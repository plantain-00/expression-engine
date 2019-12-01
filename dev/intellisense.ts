import { getIntellisenseContext, getIntellisenseOptions, parseExpression, tokenizeExpression, evaluateExpression } from '../src'

const context = getIntellisenseContext(`"ver`, 4)
console.info(context)
console.info(getIntellisenseOptions(context, {
  stringEnums: [
    {
      name: 'vertical'
    },
    {
      name: 'horizontal'
    }
  ]
}))

const ast = parseExpression(tokenizeExpression(`"a"`))
console.info(evaluateExpression(ast, {

}))
