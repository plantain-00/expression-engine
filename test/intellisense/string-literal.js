const test = require('ava')

const { getIntellisenseContext } = require('../../dist/nodejs')

const title = `string literal`

test(title, (t) => {
  const context = getIntellisenseContext(`"a`, 2)
  t.snapshot({ context }, { id: title })
})
