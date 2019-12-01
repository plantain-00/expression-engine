import test from 'ava'

import { getIntellisenseContext } from '../../dist/nodejs'

const title = `string literal`

test(title, (t) => {
  const context = getIntellisenseContext(`"a`, 2)
  t.snapshot({ context }, { id: title })
})
