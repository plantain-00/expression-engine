# Snapshot report for `test/object-literal-short-hand.ts`

The actual snapshot is saved in `object-literal-short-hand.ts.snap`.

Generated by [AVA](https://avajs.dev).

## object literal short hand

> Snapshot 1

    {
      ast: {
        arguments: [
          {
            properties: [
              {
                key: {
                  name: 'a',
                  range: [
                    4,
                    5,
                  ],
                  type: 'Identifier',
                },
                range: [
                  4,
                  5,
                ],
                shorthand: true,
                type: 'Property',
                value: {
                  name: 'a',
                  range: [
                    4,
                    5,
                  ],
                  type: 'Identifier',
                },
              },
            ],
            range: [
              2,
              7,
            ],
            type: 'ObjectExpression',
          },
        ],
        callee: {
          name: 'b',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        range: [
          0,
          8,
        ],
        type: 'CallExpression',
      },
      printResult: 'b({ a })',
      result: 1,
      tokens: [
        {
          name: 'b',
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
          value: '(',
        },
        {
          range: [
            2,
            3,
          ],
          type: 'PunctuatorToken',
          value: '{',
        },
        {
          name: 'a',
          range: [
            4,
            5,
          ],
          type: 'Identifier',
        },
        {
          range: [
            6,
            7,
          ],
          type: 'PunctuatorToken',
          value: '}',
        },
        {
          range: [
            7,
            8,
          ],
          type: 'PunctuatorToken',
          value: ')',
        },
      ],
    }
