import {
  Token,
  EOFToken,
  PunctuatorToken,
  KeywordToken,
  Expression,
  UnaryOperator,
  BinaryOperator,
  getLocale,
  Locale,
  replaceLocaleParameters,
  UnaryExpression,
  LogicalExpression,
  BinaryExpression,
  MemberExpression,
  Property,
  ObjectExpression
} from '.'

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
    if (tokens.length === 0) {
      throw new Error(this.locale.emptyExpression)
    }

    if (tokens.length === 1) {
      return this.parseLiteral(tokens[0])
    }

    if (tokens.length === 2) {
      return this.parseUnaryExpression(tokens)
    }

    const firstToken = tokens[0]
    const lastToken = tokens[tokens.length - 1]
    if (firstToken.type === 'PunctuatorToken'
      && firstToken.value === '{'
      && lastToken.type === 'PunctuatorToken'
      && lastToken.value === '}') {
      return this.parseObjectLiteral(tokens)
    }

    if (tokens.length === 3) {
      const [left, operator, right] = tokens
      const range: [number, number] = [left.range[0], right.range[1]]
      if (operator.type === 'PunctuatorToken') {
        if (callOperators.includes(operator.value)) {
          return this.parseMemberExpression(left, operator, right, range)
        }
        if (priorizedBinaryOperators.some((p) => p.some((c) => c === operator.value))) {
          return this.parseBinaryExpression(left, operator, right, range)
        }
      } else if (right.type === 'PunctuatorToken' && postfixBinaryOpeators.includes(right.value)) {
        const expression = this.parseExpression([operator, right])
        return this.parseExpression([left, expression])
      }
    }

    if (tokens.some((t) => t.type === 'PunctuatorToken' && t.value === '(')) {
      const newTokens = this.parseGroup(tokens)
      if (newTokens.length !== tokens.length) {
        return this.parseExpression(newTokens)
      }
    }

    if (tokens.some((t) => t.type === 'PunctuatorToken' && t.value === '[')) {
      const newTokens = this.parseArrayLiteral(tokens)
      if (newTokens.length !== tokens.length) {
        return this.parseExpression(newTokens)
      }
    }

    if (tokens.some((t) => t.type === 'PunctuatorToken' && (callOperators.includes(t.value) || t.value === '(' || t.value === '['))) {
      return this.parseMemberOrCallExpression(tokens)
    }

    for (const operators of priorizedBinaryOperators) {
      if (tokens.some((t) => t.type === 'PunctuatorToken' && operators.includes(t.value))) {
        return this.parsePreviousExpression(tokens, operators)
      }
    }

    if (tokens.length === 5) {
      return this.parseConditionalExpression(tokens)
    }

    throw new Error(replaceLocaleParameters(this.locale.unexpectToken, tokens[0].range[0], tokens[tokens.length - 1].range[1]))
  }

  private parseObjectLiteral(tokens: Array<Token | Expression>): ObjectExpression {
    const propertyExpressions: Property[] = []
    let keyTokens: Array<Token | Expression> = []
    let valueTokens: Array<Token | Expression> = []
    let keyPart = true
    const saveTokens = (...token: Array<Token | Expression>) => {
      if (keyPart) {
        keyTokens.push(...token)
      } else {
        valueTokens.push(...token)
      }
    }
    for (let j = 1; j < tokens.length - 1; j++) {
      const token = tokens[j]
      if (token.type === 'PunctuatorToken') {
        if (groupStarts.includes(token.value)) {
          const groupEnd = this.findGroupEnd(tokens, j, token.value)
          saveTokens(...tokens.filter((_, i) => i >= j && i <= groupEnd))
          j = groupEnd
        } else if (token.value === ',') {
          propertyExpressions.push(this.parseProperty(keyTokens, valueTokens))
          keyTokens = []
          valueTokens = []
          keyPart = true
        } else if (token.value === ':') {
          keyPart = false
        } else {
          saveTokens(token)
        }
      } else {
        saveTokens(token)
      }
    }
    if (keyTokens.length > 0) {
      propertyExpressions.push(this.parseProperty(keyTokens, valueTokens))
    }
    return {
      type: 'ObjectExpression',
      properties: propertyExpressions,
      range: [tokens[0].range[0], tokens[tokens.length - 1].range[1]]
    }
  }

  private parseProperty(keyTokens: Array<Token | Expression>, valueTokens: Array<Token | Expression>): Property {
    const key = this.parseExpression(keyTokens)
    if (key.type !== 'Identifier' && key.type !== 'StringLiteral' && key.type !== 'NumericLiteral') {
      throw new Error(replaceLocaleParameters(this.locale.invalidPropertyName, key.range[0]))
    }
    const value = this.parseExpression(valueTokens)
    return {
      type: 'Property',
      key,
      value,
      range: [key.range[0], value.range[1]]
    }
  }

  private parseMemberExpression(left: Token | Expression, operator: PunctuatorToken, right: Token | Expression, range: [number, number]): MemberExpression {
    return {
      type: 'MemberExpression',
      object: this.parseTokenOrExpression(left),
      property: this.parseTokenOrExpression(right),
      optional: operator.value === '?.',
      range
    }
  }

  private parseGroup(tokens: Array<Token | Expression>) {
    const newTokens: Array<Token | Expression> = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'PunctuatorToken' && token.value === '(') {
        const index = this.findGroupEnd(tokens, i, token.value)
        const isFunctionCall = this.hasPreviousExpression(tokens, i)
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
    return newTokens
  }

  private parseArrayLiteral(tokens: Array<Token | Expression>) {
    const newTokens: Array<Token | Expression> = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'PunctuatorToken' && token.value === '[') {
        const index = this.findGroupEnd(tokens, i, token.value)
        const isMemberAccess = this.hasPreviousExpression(tokens, i)
        if (isMemberAccess) {
          newTokens.push(token)
        } else {
          const elementExpressions = this.parseItems(tokens, i, index)
          newTokens.push({
            type: 'ArrayExpression',
            elements: elementExpressions,
            range: [token.range[0], tokens[index].range[1]]
          })
          i = index
        }
      } else {
        newTokens.push(token)
      }
    }
    return newTokens
  }

  private parseBinaryExpression(left: Token | Expression, operator: PunctuatorToken, right: Token | Expression, range: [number, number]): LogicalExpression | BinaryExpression {
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

  private parseLiteral(token: Token | Expression): Expression {
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

  private parseMemberOrCallExpression(tokens: Array<Token | Expression>) {
    const newTokens: Array<Token | Expression> = []
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]
      if (token.type === 'PunctuatorToken') {
        if (callOperators.includes(token.value)) {
          const object = newTokens.pop()!
          newTokens.push(this.parseExpression([object, token, tokens[i + 1]]))
          i++
        } else if (token.value === '[') {
          const index = this.findGroupEnd(tokens, i, token.value)
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
          const index = this.findGroupEnd(tokens, i, token.value)
          const argumentsExpressions = this.parseItems(tokens, i, index)
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

  private parsePreviousExpression(tokens: Array<Token | Expression>, operators: string[]): Expression {
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

  private parseUnaryExpression(tokens: Array<Token | Expression>): UnaryExpression {
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

  private hasPreviousExpression(tokens: Array<Token | Expression>, i: number) {
    if (i === 0) {
      return false
    }
    const token = tokens[i - 1]
    return token.type !== 'PunctuatorToken' || (token.value === ')' || token.value === ']')
  }

  private parseItems(tokens: Array<Token | Expression>, startMarkIndex: number, endMarkIndex: number) {
    const itemExpressions: Expression[] = []
    let itemTokens: Array<Token | Expression> = []
    for (let j = startMarkIndex + 1; j < endMarkIndex; j++) {
      const item = tokens[j]
      if (item.type === 'PunctuatorToken') {
        if (groupStarts.includes(item.value)) {
          const groupEnd = this.findGroupEnd(tokens, j, item.value)
          itemTokens.push(...tokens.filter((_, i) => i >= j && i <= groupEnd))
          j = groupEnd
        } else if (item.value === ',') {
          itemExpressions.push(this.parseExpression(itemTokens))
          itemTokens = []
        } else {
          itemTokens.push(item)
        }
      } else {
        itemTokens.push(item)
      }
    }
    if (itemTokens.length > 0) {
      itemExpressions.push(this.parseExpression(itemTokens))
    }
    return itemExpressions
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

  private findGroupEnd(tokens: Array<Token | Expression>, start: number, startMark: string) {
    const endMark = groupEnds[startMark]
    let count = 1
    for (let i = start + 1; i < tokens.length; i++) {
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
    throw new Error(replaceLocaleParameters(this.locale.expect, endMark, start))
  }
}

const priorizedBinaryOperators = [
  ['**'],
  ['*', '/', '%'],
  ['+', '-'],
  ['>', '>=', '<', '<='],
  ['==', '!=', '===', '!=='],
  ['&&'],
  ['||', '??']
]

const prefixBinaryOperators = ['+', '-', '!', '~']
const postfixBinaryOpeators = ['%']

const callOperators = ['.', '?.']

const groupEnds: { [start: string]: string } = {
  '{': '}',
  '[': ']',
  '(': ')'
}

const groupStarts = Object.keys(groupEnds)

function isToken(token: Token | Expression): token is EOFToken | PunctuatorToken | KeywordToken {
  return token.type === 'EOFToken'
    || token.type === 'PunctuatorToken'
    || token.type === 'KeywordToken'
}
