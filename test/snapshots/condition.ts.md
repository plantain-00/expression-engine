# Snapshot report for `test/condition.ts`

The actual snapshot is saved in `condition.ts.snap`.

Generated by [AVA](https://avajs.dev).

## condition: y ? 1 : 2

> Snapshot 1

    {
      ast: {
        alternate: {
          range: [
            8,
            9,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
        consequent: {
          range: [
            4,
            5,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        range: [
          0,
          9,
        ],
        test: {
          name: 'y',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        type: 'ConditionalExpression',
      },
      printResult: 'y ? 1 : 2',
      tokens: [
        {
          name: 'y',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        {
          range: [
            2,
            3,
          ],
          type: 'PunctuatorToken',
          value: '?',
        },
        {
          range: [
            4,
            5,
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
          value: ':',
        },
        {
          range: [
            8,
            9,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
      ],
    }

## condition: x && y ? 1 : 2

> Snapshot 1

    {
      ast: {
        alternate: {
          range: [
            13,
            14,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
        consequent: {
          range: [
            9,
            10,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        range: [
          0,
          14,
        ],
        test: {
          left: {
            name: 'x',
            range: [
              0,
              1,
            ],
            type: 'Identifier',
          },
          operator: '&&',
          range: [
            0,
            6,
          ],
          right: {
            name: 'y',
            range: [
              5,
              6,
            ],
            type: 'Identifier',
          },
          type: 'LogicalExpression',
        },
        type: 'ConditionalExpression',
      },
      printResult: 'x && y ? 1 : 2',
      tokens: [
        {
          name: 'x',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        {
          range: [
            2,
            4,
          ],
          type: 'PunctuatorToken',
          value: '&&',
        },
        {
          name: 'y',
          range: [
            5,
            6,
          ],
          type: 'Identifier',
        },
        {
          range: [
            7,
            8,
          ],
          type: 'PunctuatorToken',
          value: '?',
        },
        {
          range: [
            9,
            10,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        {
          range: [
            11,
            12,
          ],
          type: 'PunctuatorToken',
          value: ':',
        },
        {
          range: [
            13,
            14,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
      ],
    }

## condition: x == (0) ? 1 : 2

> Snapshot 1

    {
      ast: {
        alternate: {
          range: [
            15,
            16,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
        consequent: {
          range: [
            11,
            12,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        range: [
          0,
          16,
        ],
        test: {
          left: {
            name: 'x',
            range: [
              0,
              1,
            ],
            type: 'Identifier',
          },
          operator: '==',
          range: [
            0,
            8,
          ],
          right: {
            range: [
              6,
              7,
            ],
            type: 'NumericLiteral',
            value: 0,
          },
          type: 'BinaryExpression',
        },
        type: 'ConditionalExpression',
      },
      printResult: 'x == 0 ? 1 : 2',
      tokens: [
        {
          name: 'x',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        {
          range: [
            2,
            4,
          ],
          type: 'PunctuatorToken',
          value: '==',
        },
        {
          range: [
            5,
            6,
          ],
          type: 'PunctuatorToken',
          value: '(',
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
          value: ')',
        },
        {
          range: [
            9,
            10,
          ],
          type: 'PunctuatorToken',
          value: '?',
        },
        {
          range: [
            11,
            12,
          ],
          type: 'NumericLiteral',
          value: 1,
        },
        {
          range: [
            13,
            14,
          ],
          type: 'PunctuatorToken',
          value: ':',
        },
        {
          range: [
            15,
            16,
          ],
          type: 'NumericLiteral',
          value: 2,
        },
      ],
    }
