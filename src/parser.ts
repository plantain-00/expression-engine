import { Token, EOFToken, PunctuatorToken, KeywordToken, Expression, UnaryOperator, BinaryOperator, getLocale, Locale, replaceLocaleParameters } from '.'

/**
 * @public
 */
export function parseExpression(tokens: Token[], locale?: Locale): Expression {
  return new Parser(locale).parseExpression(tokens)
}

class Parser {
  constructor(locale?: Locale) {
    this.locale = getLocale(locale)
  }
  private locale: Locale

  // tslint:disable-next-line:cognitive-complexity
  parseExpression(tokens: Array<Token | Expression>): Expression {
    if (tokens.length === 1) {
      const token = tokens[0]
      if (token.type === 'KeywordToken') {
        return {
          type: 'ThisExpression',
          range: token.range
        }
      }
      if (!isToken(token)) {
        return token
      }
      throw new Error(replaceLocaleParameters(this.locale.unexpectToken, token.range[0], token.range[1]))
    }

    if (tokens.length === 2) {
      const [operator, token] = tokens
      if (operator.type === 'PunctuatorToken' && prefixBinaryOperators.includes(operator.value) && !isToken(token)) {
        return {
          type: 'UnaryExpression',
          operator: operator.value as UnaryOperator,
          argument: token,
          range: [operator.range[0], token.range[1]]
        }
      }
      if (token.type === 'PunctuatorToken' && postfixBinaryOpeators.includes(token.value) && !isToken(operator)) {
        return {
          type: 'UnaryExpression',
          operator: '%',
          argument: operator,
          range: [operator.range[0], token.range[1]]
        }
      }
      throw new Error(replaceLocaleParameters(this.locale.expectUnaryOperator, operator.range[0]))
    }

    if (tokens.length === 3) {
      const [left, operator, right] = tokens
      const range: [number, number] = [left.range[0], right.range[1]]
      if (operator.type === 'PunctuatorToken') {
        if (callOperators.includes(operator.value)) {
          return {
            type: 'MemberExpression',
            object: this.parseTokenOrExpression(left),
            property: this.parseTokenOrExpression(right),
            optional: operator.value === '?.',
            range
          }
        }
        if (priorizedBinaryOperators.some((p) => p.some((c) => c === operator.value))) {
          if (operator.value === '&&' || operator.value === '||') {
            return {
              type: 'LogicalExpression',
              left: this.parseTokenOrExpression(left),
              operator: operator.value,
              right: this.parseTokenOrExpression(right),
              range
            }
          }
          return {
            type: 'BinaryExpression',
            left: this.parseTokenOrExpression(left),
            operator: operator.value as BinaryOperator,
            right: this.parseTokenOrExpression(right),
            range
          }
        }
      } else if (right.type === 'PunctuatorToken' && postfixBinaryOpeators.includes(right.value)) {
        const expression = this.parseExpression([operator, right])
        return this.parseExpression([left, expression])
      }
    }

    if (tokens.some((t) => t.type === 'PunctuatorToken' && t.value === '(')) {
      const newTokens: Array<Token | Expression> = []
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token.type === 'PunctuatorToken' && token.value === '(') {
          const index = findGroupEnd(tokens, i + 1, '(', ')')
          const isFunctionCall = i > 0 && tokens[i - 1].type !== 'PunctuatorToken'
          if (isFunctionCall) {
            newTokens.push(token)
          } else {
            newTokens.push(this.parseExpression(tokens.filter((_, j) => j > i && j < index)))
            i = index
          }
        } else {
          newTokens.push(token)
        }
      }
      if (newTokens.length !== tokens.length) {
        return this.parseExpression(newTokens)
      }
    }

    if (tokens.some((t) => t.type === 'PunctuatorToken' && (callOperators.includes(t.value) || t.value === '(' || t.value === '['))) {
      const newTokens: Array<Token | Expression> = []
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token.type === 'PunctuatorToken') {
          if (callOperators.includes(token.value)) {
            const object = newTokens.pop()!
            newTokens.push(this.parseExpression([object, token, tokens[i + 1]]))
            i++
          } else if (token.value === '[') {
            const index = findGroupEnd(tokens, i + 1, '[', ']')
            const object = newTokens.pop()!
            const property = this.parseExpression(tokens.filter((_, j) => j > i && j < index))
            newTokens.push({
              type: 'MemberExpression',
              object: this.parseTokenOrExpression(object),
              property: this.parseTokenOrExpression(property),
              range: [object.range[0], tokens[index].range[1]]
            })
            i = index
          } else if (token.value === '(') {
            const index = findGroupEnd(tokens, i + 1, '(', ')')
            const argumentsExpressions: Expression[] = []
            let argumentTokens: Array<Token | Expression> = []
            for (let j = i + 1; j < index; j++) {
              const argument = tokens[j]
              if (argument.type === 'PunctuatorToken' && argument.value === ',') {
                argumentsExpressions.push(this.parseExpression(argumentTokens))
                argumentTokens = []
              } else {
                argumentTokens.push(argument)
              }
            }
            if (argumentTokens.length > 0) {
              argumentsExpressions.push(this.parseExpression(argumentTokens))
            }
            const lastToken = newTokens.pop()!
            newTokens.push({
              type: 'CallExpression',
              callee: this.parseExpression([lastToken]),
              arguments: argumentsExpressions,
              range: [lastToken.range[0], tokens[index].range[1]]
            })
            i = index
          } else {
            newTokens.push(token)
          }
        } else {
          newTokens.push(token)
        }
      }
      return this.parseExpression(newTokens)
    }

    for (const operators of priorizedBinaryOperators) {
      if (tokens.some((t) => t.type === 'PunctuatorToken' && operators.includes(t.value))) {
        const newTokens: Array<Token | Expression> = []
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i]
          if (token.type === 'PunctuatorToken' && operators.includes(token.value)) {
            newTokens.push(this.parseExpression([newTokens.pop()!, tokens[i], tokens[i + 1]]))
            i++
          } else {
            newTokens.push(token)
          }
        }
        return this.parseExpression(newTokens)
      }
    }

    if (tokens.length === 5) {
      return this.parseConditionalExpression(tokens)
    }

    throw new Error(replaceLocaleParameters(this.locale.unexpectToken, tokens[0].range[0], tokens[tokens.length - 1].range[1]))
  }

  private parseConditionalExpression(tokens: Array<Token | Expression>): Expression {
    const [test, operator1, consequent, operator2, alternate] = tokens
    if (operator1.type === 'PunctuatorToken' && operator1.value === '?' && operator2.type === 'PunctuatorToken' && operator2.value === ':') {
      return {
        type: 'ConditionalExpression',
        test: this.parseTokenOrExpression(test),
        consequent: this.parseTokenOrExpression(consequent),
        alternate: this.parseTokenOrExpression(alternate),
        range: [test.range[0], alternate.range[1]]
      }
    }
    throw new Error(replaceLocaleParameters(this.locale.expectConditionalOperator, operator1.range[0], operator2.range[0]))
  }

  private parseTokenOrExpression(token: Token | Expression) {
    return isToken(token) ? this.parseExpression([token]) : token
  }
}

const priorizedBinaryOperators = [
  ['**'],
  ['*', '/', '%'],
  ['+', '-'],
  ['>', '>=', '<', '<='],
  ['==', '!=', '===', '!=='],
  ['&&'],
  ['||']
]

const prefixBinaryOperators = ['+', '-', '!', '~']
const postfixBinaryOpeators = ['%']

const callOperators = ['.', '?.']

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
