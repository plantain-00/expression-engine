# Snapshot report for `test/this.ts`

The actual snapshot is saved in `this.ts.snap`.

Generated by [AVA](https://avajs.dev).

## this expression

> Snapshot 1

    {
      ast: {
        object: {
          range: [
            0,
            4,
          ],
          type: 'ThisExpression',
        },
        property: {
          name: 'a',
          range: [
            5,
            6,
          ],
          type: 'Identifier',
        },
        range: [
          0,
          6,
        ],
        type: 'MemberExpression',
      },
      printResult: 'this.a',
      result: 2,
      tokens: [
        {
          name: 'this',
          range: [
            0,
            4,
          ],
          type: 'KeywordToken',
        },
        {
          range: [
            4,
            5,
          ],
          type: 'PunctuatorToken',
          value: '.',
        },
        {
          name: 'a',
          range: [
            5,
            6,
          ],
          type: 'Identifier',
        },
      ],
    }
