import { Token, PunctuatorToken, BooleanLiteral, Identifier, KeywordToken, NumericLiteral, StringLiteral, Locale, getLocale, replaceLocaleParameters, NullLiteral, ExpressionError } from '.'

/**
 * @public
 */
export function tokenizeExpression(expression: string) {
  return new Tokenizer(expression).toTokens()
}

class Tokenizer {
  constructor(public source: string, locale?: Locale) {
    this.locale = getLocale(locale)
  }
  private locale: Locale
  private index = 0
  private previousToken: Token = {
    type: 'EOFToken',
    range: [0, 0]
  }

  public toTokens() {
    const tokens: Token[] = []
    let token = this.nextToken()
    while (token.type !== 'EOFToken') {
      tokens.push(token)
      token = this.nextToken()
    }
    return tokens
  }

  private nextToken(): Token {
    if (this.index >= this.source.length) {
      this.previousToken = {
        type: 'EOFToken',
        range: [this.source.length, this.source.length]
      }
    } else {
      const c = this.source[this.index]
      if (c === ' ') {
        this.index++
        this.previousToken = this.nextToken()
      } else if (c === '"' || c === "'") {
        this.previousToken = this.nextStringToken(c)
      } else if ((c === '.')) {
        if (this.source[this.index + 1] === '.' && this.source[this.index + 2] === '.') {
          this.previousToken = this.nextPunctuator(c)
        } else if (this.previousToken.type === 'EOFToken'
          || (this.previousToken.type === 'PunctuatorToken' && numberPunctuators.includes(this.previousToken.value))) {
          this.previousToken = this.nextNumericToken(true)
        } else {
          this.previousToken = this.nextPunctuator(c)
        }
      } else if ((c >= '0' && c <= '9')) {
        this.previousToken = this.nextNumericToken(false)
      } else if (punctuators.includes(c)) {
        this.previousToken = this.nextPunctuator(c)
      } else {
        this.previousToken = this.nextIdentifierToken()
      }
    }
    return this.previousToken
  }

  private nextPunctuator(c: string): PunctuatorToken {
    const startIndex = this.index
    if (c === '>' || c === '<' || c === '=' || c === '!') {
      if (this.source[this.index + 1] === '=') {
        if ((c === '=' || c === '!') && this.source[this.index + 2] === '=') {
          c += '=='
          this.index += 2
        } else {
          c += '='
          this.index++
        }
      } else if (c === '>' && this.source[this.index + 1] === '>') {
        if (this.source[this.index + 2] === '>') {
          c += '>>'
          this.index += 2
        } else {
          c += '>'
          this.index++
        }
      } else if (c === '<' && this.source[this.index + 1] === '<') {
        c += '<'
        this.index++
      } else if (c === '=' && this.source[this.index + 1] === '>') {
        c += '>'
        this.index++
      }
    } else if ((c === '&' || c === '|') && this.source[this.index + 1] === c) {
      c += c
      this.index++
    } else if (c === '*' && this.source[this.index + 1] === '*') {
      c += '*'
      this.index++
    } else if (c === '?' && (this.source[this.index + 1] === '.' || this.source[this.index + 1] === '?')) {
      c += this.source[this.index + 1]
      this.index++
    } else if (c === '.' && this.source[this.index + 1] === '.' && this.source[this.index + 1] === '.') {
      c += '..'
      this.index += 2
    } else if (c === '|' && this.source[this.index + 1] === '>') {
      c += '>'
      this.index++
    }
    this.index++
    return {
      type: 'PunctuatorToken',
      value: c,
      range: [startIndex, this.index]
    }
  }

  private nextIdentifierToken(): KeywordTokens {
    const index = this.findEndOfIdentifier()
    if (index === undefined) {
      const range: [number, number] = [this.index, this.source.length]
      const token = this.getExplicitIdentifierToken(this.source.substring(this.index), range)
      this.index = this.source.length
      return token
    }
    const range: [number, number] = [this.index, index]
    const token = this.getExplicitIdentifierToken(this.source.substring(this.index, index), range)
    this.index = index
    return token
  }

  private getExplicitIdentifierToken(tokenName: string, range: [number, number]): KeywordTokens {
    if (tokenName === 'true' || tokenName === 'false') {
      return {
        type: 'BooleanLiteral',
        value: tokenName === 'true',
        range
      }
    }
    if (tokenName === 'this') {
      return {
        type: 'KeywordToken',
        name: tokenName,
        range
      }
    }
    if (tokenName === 'null') {
      return {
        type: 'NullLiteral',
        range
      }
    }
    if (tokenName === 'and') {
      return {
        type: 'PunctuatorToken',
        value: '&&',
        range
      }
    }
    if (tokenName === 'or') {
      return {
        type: 'PunctuatorToken',
        value: '||',
        range
      }
    }
    if (tokenName === 'not') {
      return {
        type: 'PunctuatorToken',
        value: '!',
        range
      }
    }
    if (tokenName === 'await') {
      return {
        type: 'PunctuatorToken',
        value: tokenName,
        range
      }
    }
    return {
      type: 'Identifier',
      name: tokenName,
      range
    }
  }

  private findEndOfIdentifier() {
    for (let i = this.index; i < this.source.length; i++) {
      const c = this.source[i]
      if (c === ' ' || c === '"' || c === "'" || c === '.' || punctuators.includes(c)) {
        return i
      }
    }
    return undefined
  }

  private nextNumericToken(hasDecimalPoint: boolean): NumericLiteral {
    const startIndex = this.index
    let letterRange = (a: string) => a >= '0' && a <= '9'
    let multiplier: number | undefined
    let powerStartIndex = this.index
    for (let i = this.index + 1; i < this.source.length; i++) {
      const c = this.source[i]
      if (c === '.') {
        if (hasDecimalPoint) {
          throw new ExpressionError(replaceLocaleParameters(this.locale.multipleDecimalPoint, i), [i, i + 1])
        }
        hasDecimalPoint = true
      } else if (letterRange(c)) {
        continue
      } else if (i === 1
        && this.source[0] === '0'
        && (c === 'x' || c === 'X' || c === 'b' || c === 'B' || c === 'o' || c === 'O')) {
        if (c === 'x' || c === 'X') {
          letterRange = (a: string) => (a >= '0' && a <= '9') || (a >= 'a' && a <= 'f')
        } else if (c === 'b' || c === 'B') {
          letterRange = (a: string) => a >= '0' && a <= '1'
        } else {
          letterRange = (a: string) => a >= '0' && a <= '7'
        }
        continue
      } else if (multiplier === undefined && (c === 'e' || c === 'E')) {
        multiplier = +this.source.substring(this.index, i)
        powerStartIndex = i + 1
        continue
      } else if (multiplier !== undefined && c === '-') {
        continue
      } else if (c === '_') {
        continue
      } else {
        const value = multiplier === undefined
          ? this.getNumber(this.index, i)
          : multiplier * 10 ** this.getNumber(powerStartIndex, i)
        this.index = i
        return {
          type: 'NumericLiteral',
          value,
          range: [startIndex, this.index]
        }
      }
    }
    const value = multiplier === undefined
      ? this.getNumber(this.index)
      : multiplier * 10 ** this.getNumber(powerStartIndex)
    this.index = this.source.length
    return {
      type: 'NumericLiteral',
      value,
      range: [startIndex, this.index]
    }
  }

  private getNumber(startIndex: number, endIndex?: number) {
    return +Array.from(this.source.substring(startIndex, endIndex)).filter((a) => a !== '_').join('')
  }

  private nextStringToken(c: string): StringLiteral {
    const startIndex = this.index
    this.index++
    const index = this.findEndOfString(c)
    if (index === undefined) {
      throw new ExpressionError(replaceLocaleParameters(this.locale.expect, c, startIndex), [startIndex, this.source.length])
    }
    const token = this.source.substring(this.index, index)
    this.index = index + 1
    return {
      type: 'StringLiteral',
      value: token,
      range: [startIndex, this.index]
    }
  }

  private findEndOfString(c: string) {
    for (let i = this.index; i < this.source.length; i++) {
      if (this.source[i] === c) {
        return i
      }
    }
    return undefined
  }
}

const numberPunctuators = [
  '*', '/', '%',
  '+', '-',
  '>', '<', '=', '!',
  '&', '^', '|',
]

const punctuators = [
  '(', ')',
  '[', ']',
  '{', '}',
  ...numberPunctuators,
  '?', ':',
  ',', '~'
]

type KeywordTokens =
  | BooleanLiteral |
  Identifier
  | KeywordToken
  | PunctuatorToken
  | NullLiteral
