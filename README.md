# expression-engine

An expression tokenizer, parser and evaluator.

[![Dependency Status](https://david-dm.org/plantain-00/expression-engine.svg)](https://david-dm.org/plantain-00/expression-engine)
[![devDependency Status](https://david-dm.org/plantain-00/expression-engine/dev-status.svg)](https://david-dm.org/plantain-00/expression-engine#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/expression-engine?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/expression-engine/branch/master)
![Github CI](https://github.com/plantain-00/expression-engine/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/expression-engine.svg)](https://badge.fury.io/js/expression-engine)
[![Downloads](https://img.shields.io/npm/dm/expression-engine.svg)](https://www.npmjs.com/package/expression-engine)
[![gzip size](https://img.badgesize.io/https://unpkg.com/expression-engine?compression=gzip)](https://unpkg.com/expression-engine)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fexpression-engine%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/expression-engine)

## install

`yarn add expression-engine`

## usage

```ts
import { tokenizeExpression, parseExpression, evaluateExpression, printExpression } from "expression-engine";

const tokens = tokenizeExpression('a + b')
const ast = parseExpression(tokens)
const result = evaluateExpression(ast, { a: 1, b: 2 })
const expression = printExpression(ast)

// <script src="./node_modules/expression-engine/expression-engine.min.js"></script>
```

## supported expression features(ordered by priority from high to low)

+ numeric literal: 123 0x123 0o123 0b101 2e2 123_456
+ string literal: 'abc' "abc"
+ boolean literal: true false
+ array literal: [a, b] [a, ...b]
+ object literal: { a: 1 } { a: 1, ...b} { a }
+ null literal

+ group: ( )
+ member expression and call expression: a.b a[0] a['b'] a(1, 2) a?.b a(...b) a?.[0] a?.()
+ unary expression: %
+ unary expression: + - ! ~ not await
+ binary expression: **
+ binary expression: * / %
+ binary expression: + -
+ binary expression: << >> >>>
+ binary expression: > < >= <=
+ binary expression: == != === !==
+ binary expression: && and
+ binary expression: &
+ binary expression: ^
+ binary expression: |
+ binary expression: || ?? or
+ pipeline operator: |>
+ condition expression: a ? b : c

## custom data

```ts
import { tokenizeExpression, parseExpression, evaluateExpression, CustomData } from 'expression-engine'

class HighlightText implements CustomData {
  constructor(public text: string, public highlight: number[]) { }

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

const tokens = tokenizeExpression('a + b')
const ast = parseExpression(tokens)
const result = evaluateExpression(
  ast,
  {
    a: new HighlightText('aaa', [1, 1]),
    b: new HighlightText('bbb', [1, 1])
  },
  undefined,
  [HighlightText]
)
// HighlightText { text: 'aaabbb', highlight: [ 1, 1, 2, 1 ] }
```
