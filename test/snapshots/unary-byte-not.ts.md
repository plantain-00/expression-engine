# Snapshot report for `test/unary-byte-not.ts`

The actual snapshot is saved in `unary-byte-not.ts.snap`.

Generated by [AVA](https://avajs.dev).

## unary expression byte not

> Snapshot 1

    {
      ast: {
        argument: {
          name: 'a',
          range: [
            1,
            2,
          ],
          type: 'Identifier',
        },
        operator: '~',
        range: [
          0,
          2,
        ],
        type: 'UnaryExpression',
      },
      printResult: '~a',
      result: -124,
      tokens: [
        {
          range: [
            0,
            1,
          ],
          type: 'PunctuatorToken',
          value: '~',
        },
        {
          name: 'a',
          range: [
            1,
            2,
          ],
          type: 'Identifier',
        },
      ],
    }
