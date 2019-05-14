import { Token, EOFToken, PunctuatorToken, KeywordToken, Expression, UnaryOperator, BinaryOperator } from '.'

/**
 * @public
 */
// tslint:disable-next-line:cognitive-complexity
export function parseExpression(tokens: Array<Token | Expression>): Expression {
  if (tokens.length === 1) {
    const token = tokens[0]
    if (token.type === 'KeywordToken') {
      return {
        type: 'ThisExpression'
      }
    }
    if (!isToken(token)) {
      return token
    }
    throw new Error('error')
  }
  if (tokens.length === 2) {
    const [operator, token] = tokens
    if (operator.type === 'PunctuatorToken' && priority4Operators.includes(operator.value) && !isToken(token)) {
      return {
        type: 'UnaryExpression',
        operator: operator.value as UnaryOperator,
        argument: token
      }
    }
    throw new Error('error')
  }
  if (tokens.length === 3) {
    const [left, operator, right] = tokens
    if (operator.type === 'PunctuatorToken') {
      if (operator.value === '.') {
        return {
          type: 'MemberExpression',
          object: isToken(left) ? parseExpression([left]) : left,
          property: isToken(right) ? parseExpression([right]) : right
        }
      }
      if (operators.includes(operator.value)) {
        if (operator.value === '&&' || operator.value === '||') {
          return {
            type: 'LogicalExpression',
            left: isToken(left) ? parseExpression([left]) : left,
            operator: operator.value,
            right: isToken(right) ? parseExpression([right]) : right
          }
        }
        return {
          type: 'BinaryExpression',
          left: isToken(left) ? parseExpression([left]) : left,
          operator: operator.value as BinaryOperator,
          right: isToken(right) ? parseExpression([right]) : right
        }
      }
    }
    throw new Error('error')
  }
  if (tokens.some((t) => t.type === 'PunctuatorToken' && t.value === '(')) {
    const newTokens: Array<Token | Expression> = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'PunctuatorToken' && token.value === '(') {
        const index = findGroupEnd(tokens, i + 1, '(', ')')
        const isFunctionCall = i > 0 && tokens[i - 1].type !== 'PunctuatorToken'
        if (isFunctionCall) {
          const argumentsExpressions: Expression[] = []
          let argumentTokens: Array<Token | Expression> = []
          for (let j = i + 1; j < index; j++) {
            const argument = tokens[j]
            if (argument.type === 'PunctuatorToken' && argument.value === ',') {
              argumentsExpressions.push(parseExpression(argumentTokens))
              argumentTokens = []
            } else {
              argumentTokens.push(argument)
            }
          }
          if (argumentTokens.length > 0) {
            argumentsExpressions.push(parseExpression(argumentTokens))
          }
          newTokens.push({
            type: 'CallExpression',
            callee: parseExpression([newTokens.pop()!]),
            arguments: argumentsExpressions
          })
        } else {
          newTokens.push(parseExpression(tokens.filter((_, j) => j > i && j < index)))
        }
        i = index
      } else {
        newTokens.push(token)
      }
    }
    return parseExpression(newTokens)
  }
  if (tokens.some((t) => t.type === 'PunctuatorToken' && t.value === '[')) {
    const newTokens: Array<Token | Expression> = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'PunctuatorToken' && token.value === '[') {
        const index = findGroupEnd(tokens, i + 1, '[', ']')
        const object = newTokens.pop()!
        const property = parseExpression(tokens.filter((_, j) => j > i && j < index))
        newTokens.push({
          type: 'MemberExpression',
          object: isToken(object) ? parseExpression([object]) : object,
          property: isToken(property) ? parseExpression([property]) : property
        })
        i = index
      } else {
        newTokens.push(token)
      }
    }
    console.info(newTokens)
    return parseExpression(newTokens)
  }
  for (const operators of [priority3Operators, priority4Operators, priority6Operators, priority7Operators, priority11Operators, priority12Operators]) {
    if (tokens.some((t) => t.type === 'PunctuatorToken' && operators.includes(t.value))) {
      const newTokens: Array<Token | Expression> = []
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token.type === 'PunctuatorToken' && operators.includes(token.value)) {
          newTokens.push(parseExpression([newTokens.pop()!, tokens[i], tokens[i + 1]]))
          i++
        } else {
          newTokens.push(token)
        }
      }
      return parseExpression(newTokens)
    }
  }
  if (tokens.length === 5) {
    const [test, operator1, consequent, operator2, alternate] = tokens
    if (operator1.type === 'PunctuatorToken' && operator1.value === '?' && operator2.type === 'PunctuatorToken' && operator2.value === ':') {
      return {
        type: 'ConditionalExpression',
        test: isToken(test) ? parseExpression([test]) : test,
        consequent: isToken(consequent) ? parseExpression([consequent]) : consequent,
        alternate: isToken(alternate) ? parseExpression([alternate]) : alternate
      }
    }
    throw new Error('error')
  }
  throw new Error('error')
}

const priority3Operators = ['*', '/']
const priority4Operators = ['+', '-']
const priority6Operators = ['>', '>=', '<', '<=']
const priority7Operators = ['==', '!=']
const priority11Operators = ['&&']
const priority12Operators = ['||']
const operators = [
  ...priority3Operators,
  ...priority4Operators,
  ...priority6Operators,
  ...priority7Operators,
  ...priority11Operators,
  ...priority12Operators
]

function isToken(token: Token | Expression): token is EOFToken | PunctuatorToken | KeywordToken {
  return token.type === 'EOFToken'
    || token.type === 'PunctuatorToken'
    || token.type === 'KeywordToken'
}

function findGroupEnd(tokens: Array<Token | Expression>, start: number, startMark: string, endMark: string) {
  let count = 1
  for (let i = start; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'PunctuatorToken') {
      if (token.value === startMark) {
        count++
      } else if (token.value === endMark) {
        count--
        if (count === 0) {
          return i
        }
      }
    }
  }
  return -1
}
