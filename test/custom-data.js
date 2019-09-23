import test from 'ava'

import { tokenizeExpression, parseExpression, evaluateExpression } from '../dist/nodejs'

const title = 'custom data'

class HighlightText {
  constructor(text, highlight) {
    this.text = text
    this.highlight = highlight
  }

  add(right) {
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

  added(left) {
    if (this.highlight.length > 0) {
      const [first, ...remain] = this.highlight
      return new HighlightText(left + this.text, [first + left.length, ...remain])
    }
    return new HighlightText(left + this.text, this.highlight)
  }

  equal(value) {
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

function isCustomData(value) {
  return value instanceof HighlightText
}

test(title, (t) => {
  const ast1 = parseExpression(tokenizeExpression('a + b'))
  const result1 = evaluateExpression(
    ast1,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('bbb', [1, 1])
    },
    undefined,
    isCustomData
  )
  const result2 = evaluateExpression(
    ast1,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: 'bbb'
    },
    undefined,
    isCustomData
  )
  const result3 = evaluateExpression(
    ast1,
    {
      a: 'aaa',
      b: new HighlightText('bbb', [1, 1])
    },
    undefined,
    isCustomData
  )
  const result4 = evaluateExpression(
    ast1,
    {
      a: 'aaa',
      b: 'bbb'
    },
    undefined,
    isCustomData
  )

  const ast2 = parseExpression(tokenizeExpression('a == b'))
  const result5 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa', [1, 1])
    },
    undefined,
    isCustomData
  )
  const result6 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: 'aaa'
    },
    undefined,
    isCustomData
  )
  const result7 = evaluateExpression(
    ast2,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa')
    },
    undefined,
    isCustomData
  )

  const ast3 = parseExpression(tokenizeExpression('a != b'))
  const result8 = evaluateExpression(
    ast3,
    {
      a: new HighlightText('aaa', [1, 1]),
      b: new HighlightText('aaa', [1, 1])
    },
    undefined,
    isCustomData
  )
  t.snapshot({ result1, result2, result3, result4, result5, result6, result7, result8 }, { id: title })
})
