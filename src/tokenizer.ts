import { Token, PunctuatorToken, BooleanLiteral, Identifier, KeywordToken, NumericLiteral, StringLiteral } from '.'

/**
 * @public
 */
export class Tokenizer {
  constructor(public source: string) { }
  private index = 0
  private previousToken: Token = {
    type: 'EOFToken'
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
        type: 'EOFToken'
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

  private nextPunctuator(c: string): PunctuatorToken {
    if (c === '>' || c === '<' || c === '=' || c === '!') {
      if (this.source[this.index + 1] === '=') {
        c += '='
        this.index++
      }
    } else if ((c === '&' || c === '|') && this.source[this.index + 1] === c) {
      c += c
      this.index++
    }
    this.index++
    return {
      type: 'PunctuatorToken',
      value: c
    }
  }

  private nextIdentifierToken(): BooleanLiteral | Identifier | KeywordToken {
    const index = this.findEndOfIdentifier()
    if (index === undefined) {
      const token = this.getExplicitIdentifierToken(this.source.substring(this.index))
      this.index = this.source.length
      return token
    }
    const token = this.getExplicitIdentifierToken(this.source.substring(this.index, index))
    this.index = index
    return token
  }

  private getExplicitIdentifierToken(tokenName: string): BooleanLiteral | Identifier | KeywordToken {
    if (tokenName === 'true' || tokenName === 'false') {
      return {
        type: 'BooleanLiteral',
        value: tokenName === 'true'
      }
    }
    if (tokenName === 'this') {
      return {
        type: 'KeywordToken',
        name: tokenName
      }
    }
    return {
      type: 'Identifier',
      name: tokenName
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
    for (let i = this.index + 1; i < this.source.length; i++) {
      const c = this.source[i]
      if (c === '.') {
        if (hasDecimalPoint) {
          throw new Error('Multiple decimal point')
        }
        hasDecimalPoint = true
      } else if (c > '0' && c < '9') {
        continue
      } else {
        const value = +this.source.substring(this.index, i)
        this.index = i
        return {
          type: 'NumericLiteral',
          value
        }
      }
    }
    const value = +this.source.substring(this.index)
    this.index = this.source.length
    return {
      type: 'NumericLiteral',
      value
    }
  }

  private nextStringToken(c: string): StringLiteral {
    this.index++
    const index = this.findEndOfString(c)
    if (index === undefined) {
      throw new Error(`Expect ${c}`)
    }
    const token = this.source.substring(this.index, index)
    this.index = index + 1
    return {
      type: 'StringLiteral',
      value: token
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

const punctuators = ['+', '-', '*', '/', '(', ')', '>', '<', '=', '!', '&', '|', '?', ':', '[', ']', ',']
