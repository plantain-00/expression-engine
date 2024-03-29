import test from 'ava'

import { tokenizeExpression, parseExpression, evaluateExpression } from '../src'

class HighlightText {
  constructor(public text: string, public highlight: number[] = []) {
  }

  add(right: string | HighlightText) {
    if (typeof right === 'string') {
      return new HighlightText(this.text + right, this.highlight)
    }
    const highlight = [...this.highlight]
    if (right.highlight.length > 0) {
      const [first, ...remain] = right.highlight
      highlight.push(first + this.text.length - highlight.reduce((p, c) => p + c, 0), ...remain)
    }
    return new HighlightText(this.text + right.text, highlight)
  }

  added(left: string) {
    if (this.highlight.length > 0) {
      const [first, ...remain] = this.highlight
      return new HighlightText(left + this.text, [first + left.length, ...remain])
    }
    return new HighlightText(left + this.text, this.highlight)
  }

  equal(value: string | HighlightText) {
    const text = typeof value === 'string' ? value : value.text
    const highlight = typeof value === 'string' ? [] : value.highlight || []
    if (text !== this.text) {
      return false
    }
    if (this.highlight.length !== highlight.length) {
      return false
    }
    for (let i = 0; i < highlight.length; i++) {
      if (highlight[i] !== this.highlight[i]) {
        return false
      }
    }
    return true
  }
}

test('custom data', (t) => {
  const ast1 = parseExpression(tokenizeExpression('a + b'))
  const result1 = evaluateExpression(
    ast1,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('bbb', [1, 1])
    },
    undefined,
    [HighlightText]
  )
  const result2 = evaluateExpression(
    ast1,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: 'bbb'
    },
    undefined,
    [HighlightText]
  )
  const result3 = evaluateExpression(
    ast1,
    {
      a: 'aaa',
      b: new HighlightText('bbb', [1, 1])
    },
    undefined,
    [HighlightText]
  )
  const result4 = evaluateExpression(
    ast1,
    {
      a: 'aaa',
      b: 'bbb'
    },
    undefined,
    [HighlightText]
  )

  const ast2 = parseExpression(tokenizeExpression('a == b'))
  const result5 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa', [1, 1])
    },
    undefined,
    [HighlightText]
  )
  const result6 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: 'aaa'
    },
    undefined,
    [HighlightText]
  )
  const result7 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa')
    },
    undefined,
    [HighlightText]
  )

  const ast3 = parseExpression(tokenizeExpression('a != b'))
  const result8 = evaluateExpression(
    ast3,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa', [1, 1])
    },
    undefined,
    [HighlightText]
  )
  t.snapshot({ result1, result2, result3, result4, result5, result6, result7, result8 })
})
