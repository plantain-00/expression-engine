# Snapshot report for `test/member-and-call-2.ts`

The actual snapshot is saved in `member-and-call-2.ts.snap`.

Generated by [AVA](https://avajs.dev).

## member expression and call expression 2

> Snapshot 1

    {
      ast: {
        object: {
          arguments: [],
          callee: {
            object: {
              name: 'a',
              range: [
                0,
                1,
              ],
              type: 'Identifier',
            },
            property: {
              name: 'b',
              range: [
                2,
                3,
              ],
              type: 'Identifier',
            },
            range: [
              0,
              3,
            ],
            type: 'MemberExpression',
          },
          range: [
            0,
            5,
          ],
          type: 'CallExpression',
        },
        property: {
          range: [
            6,
            7,
          ],
          type: 'NumericLiteral',
          value: 0,
        },
        range: [
          0,
          8,
        ],
        type: 'MemberExpression',
      },
      printResult: 'a.b()[0]',
      result: 1,
      tokens: [
        {
          name: 'a',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        {
          range: [
            1,
            2,
          ],
          type: 'PunctuatorToken',
          value: '.',
        },
        {
          name: 'b',
          range: [
            2,
            3,
          ],
          type: 'Identifier',
        },
        {
          range: [
            3,
            4,
          ],
          type: 'PunctuatorToken',
          value: '(',
        },
        {
          range: [
            4,
            5,
          ],
          type: 'PunctuatorToken',
          value: ')',
        },
        {
          range: [
            5,
            6,
          ],
          type: 'PunctuatorToken',
          value: '[',
        },
        {
          range: [
            6,
            7,
          ],
          type: 'NumericLiteral',
          value: 0,
        },
        {
          range: [
            7,
            8,
          ],
          type: 'PunctuatorToken',
          value: ']',
        },
      ],
    }
