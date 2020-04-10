const test = require('ava')

const { testParser } = require('./utils')

const title = 'class'

test(title, (t) => {
  class A {
    constructor(value) {
      this.value = value
    }
  }
  class B {
    constructor(value) {
      this.value = value
    }
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
