# expression-engine

An expression tokenizer, parser and evaluator.

[![Dependency Status](https://david-dm.org/plantain-00/expression-engine.svg)](https://david-dm.org/plantain-00/expression-engine)
[![devDependency Status](https://david-dm.org/plantain-00/expression-engine/dev-status.svg)](https://david-dm.org/plantain-00/expression-engine#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/expression-engine.svg?branch=master)](https://travis-ci.org/plantain-00/expression-engine)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/expression-engine?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/expression-engine/branch/master)
[![npm version](https://badge.fury.io/js/expression-engine.svg)](https://badge.fury.io/js/expression-engine)
[![Downloads](https://img.shields.io/npm/dm/expression-engine.svg)](https://www.npmjs.com/package/expression-engine)
[![gzip size](https://img.badgesize.io/https://unpkg.com/expression-engine?compression=gzip)](https://unpkg.com/expression-engine)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fexpression-engine%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/expression-engine)

## install

`yarn add expression-engine`

## usage

```ts
import { parseExpression, Tokenizer } from "expression-engine";

const tokens = new Tokenizer('a + b').toTokens()
const ast = parseExpression(tokens)
// <script src="./node_modules/expression-engine/expression-engine.min.js"></script>
```

## supported expression features

+ binary expression: + - * / > < >= <= == != && ||
+ group: ( )
+ unary expression: + -
+ member expression: a.b a[0] a['b']
+ condition expression: a ? b : c
+ numeric literal: 123
+ string literal: 'abc' "abc"
+ call expression: a(1, 2)

## todo

+ i18n error message
+ evaluate
+ and or not
+ percent
+ !a
+ 123_456
+ plugin?
+ & | ^ << >> >>>
+ a % b
+ === !==
+ **
+ ?.
+ position
+ array literal
+ object literal
+ destructuring
+ template string
+ null
+ undefined
+ regex literal
+ 0x 0o 0b
+ 123n
+ 2e2
+ |>
