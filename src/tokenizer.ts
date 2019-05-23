import { Token, PunctuatorToken, BooleanLiteral, Identifier, KeywordToken, NumericLiteral, StringLiteral, Locale, getLocale, replaceLocaleParameters } from '.'

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

  // tslint:disable-next-line:cognitive-complexity
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
        if ((this.previousToken.type === 'EOFToken' || this.previousToken.type === 'PunctuatorToken')) {
          this.previousToken = this.nextNumericToken(true)
        } else {
          this.previousToken = this.nextPunctuator(c)
        }
      } else if ((c >= '0' && c <= '9')) {
        this.previousToken = this.nextNumericToken(c === '.')
      } else if (punctuators.includes(c)) {
        this.previousToken = this.nextPunctuator(c)
      } else {
        this.previousToken = this.nextIdentifierToken()
      }
    }
    return this.previousToken
  }

  // tslint:disable-next-line:cognitive-complexity
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
    for (let i = this.index + 1; i < this.source.length; i++) {
      const c = this.source[i]
      if (c === '.') {
        if (hasDecimalPoint) {
          throw new Error(replaceLocaleParameters(this.locale.multipleDecimalPoint, i))
        }
        hasDecimalPoint = true
      } else if (c > '0' && c < '9') {
        continue
      } else {
        const value = +this.source.substring(this.index, i)
        this.index = i
        return {
          type: 'NumericLiteral',
          value,
          range: [startIndex, this.index]
        }
      }
    }
    const value = +this.source.substring(this.index)
    this.index = this.source.length
    return {
      type: 'NumericLiteral',
      value,
      range: [startIndex, this.index]
    }
  }

  private nextStringToken(c: string): StringLiteral {
    const startIndex = this.index
    this.index++
    const index = this.findEndOfString(c)
    if (index === undefined) {
      throw new Error(replaceLocaleParameters(this.locale.expect, c, startIndex))
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

const punctuators = ['+', '-', '*', '/', '%', '(', ')', '>', '<', '=', '!', '&', '|', '?', ':', '[', ']', ',', '~', '{', '}']

type KeywordTokens = BooleanLiteral | Identifier | KeywordToken | PunctuatorToken
