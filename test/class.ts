import test from 'ava'

import { testParser } from './utils'

const title = 'class'

test(title, (t) => {
  class A {
    constructor(public value: number) {
    }
    parent?: B
  }
  class B {
    constructor(public value: number) {
    }
    child?: A
  }
  const a = new A(1)
  const b = new B(2)
  a.parent = b
  b.child = a
  const { tokens, ast, result, printResult } = testParser(`a.parent.child.parent.child.parent.value`, t, {
    context: {
      a: a
    }
  })
  t.snapshot({ tokens, ast, result, printResult }, { id: title })
})
