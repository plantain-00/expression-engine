# Snapshot report for `test/arrow-function-rest.ts`

The actual snapshot is saved in `arrow-function-rest.ts.snap`.

Generated by [AVA](https://avajs.dev).

## arrow function rest

> Snapshot 1

    {
      ast: {
        arguments: [
          {
            elements: [
              {
                range: [
                  5,
                  6,
                ],
                type: 'NumericLiteral',
                value: 1,
              },
              {
                range: [
                  8,
                  9,
                ],
                type: 'NumericLiteral',
                value: 2,
              },
              {
                range: [
                  11,
                  12,
                ],
                type: 'NumericLiteral',
                value: 3,
              },
            ],
            range: [
              4,
              13,
            ],
            type: 'ArrayExpression',
          },
          {
            body: {
              left: {
                left: {
                  name: 'a',
                  range: [
                    28,
                    29,
                  ],
                  type: 'Identifier',
                },
                operator: '*',
                range: [
                  28,
                  33,
                ],
                right: {
                  name: 'a',
                  range: [
                    32,
                    33,
                  ],
                  type: 'Identifier',
                },
                type: 'BinaryExpression',
              },
              operator: '+',
              range: [
                28,
                40,
              ],
              right: {
                object: {
                  name: 'b',
                  range: [
                    36,
                    37,
                  ],
                  type: 'Identifier',
                },
                property: {
                  range: [
                    38,
                    39,
                  ],
                  type: 'NumericLiteral',
                  value: 0,
                },
                range: [
                  36,
                  40,
                ],
                type: 'MemberExpression',
              },
              type: 'BinaryExpression',
            },
            params: [
              {
                name: 'a',
                range: [
                  16,
                  17,
                ],
                type: 'Identifier',
              },
              {
                argument: {
                  name: 'b',
                  range: [
                    22,
                    23,
                  ],
                  type: 'Identifier',
                },
                range: [
                  19,
                  23,
                ],
                type: 'RestElement',
              },
            ],
            range: [
              15,
              40,
            ],
            type: 'ArrowFunctionExpression',
          },
        ],
        callee: {
          name: 'map',
          range: [
            0,
            3,
          ],
          type: 'Identifier',
        },
        range: [
          0,
          41,
        ],
        type: 'CallExpression',
      },
      printResult: 'map([1, 2, 3], (a, ...b) => a * a + b[0])',
      result: [
        1,
        5,
        11,
      ],
      tokens: [
        {
          name: 'map',
          range: [
            0,
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
          value: '[',
        },
        {
          range: [
            5,
            6,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        {
          range: [
            6,
            7,
          ],
          type: 'PunctuatorToken',
          value: ',',
        },
        {
          range: [
            8,
            9,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
        {
          range: [
            9,
            10,
          ],
          type: 'PunctuatorToken',
          value: ',',
        },
        {
          range: [
            11,
            12,
          ],
          type: 'NumericLiteral',
          value: 3,
        },
        {
          range: [
            12,
            13,
          ],
          type: 'PunctuatorToken',
          value: ']',
        },
        {
          range: [
            13,
            14,
          ],
          type: 'PunctuatorToken',
          value: ',',
        },
        {
          range: [
            15,
            16,
          ],
          type: 'PunctuatorToken',
          value: '(',
        },
        {
          name: 'a',
          range: [
            16,
            17,
          ],
          type: 'Identifier',
        },
        {
          range: [
            17,
            18,
          ],
          type: 'PunctuatorToken',
          value: ',',
        },
        {
          range: [
            19,
            22,
          ],
          type: 'PunctuatorToken',
          value: '...',
        },
        {
          name: 'b',
          range: [
            22,
            23,
          ],
          type: 'Identifier',
        },
        {
          range: [
            23,
            24,
          ],
          type: 'PunctuatorToken',
          value: ')',
        },
        {
          range: [
            25,
            27,
          ],
          type: 'PunctuatorToken',
          value: '=>',
        },
        {
          name: 'a',
          range: [
            28,
            29,
          ],
          type: 'Identifier',
        },
        {
          range: [
            30,
            31,
          ],
          type: 'PunctuatorToken',
          value: '*',
        },
        {
          name: 'a',
          range: [
            32,
            33,
          ],
          type: 'Identifier',
        },
        {
          range: [
            34,
            35,
          ],
          type: 'PunctuatorToken',
          value: '+',
        },
        {
          name: 'b',
          range: [
            36,
            37,
          ],
          type: 'Identifier',
        },
        {
          range: [
            37,
            38,
          ],
          type: 'PunctuatorToken',
          value: '[',
        },
        {
          range: [
            38,
            39,
          ],
          type: 'NumericLiteral',
          value: 0,
        },
        {
          range: [
            39,
            40,
          ],
          type: 'PunctuatorToken',
          value: ']',
        },
        {
          range: [
            40,
            41,
          ],
          type: 'PunctuatorToken',
          value: ')',
        },
      ],
    }
