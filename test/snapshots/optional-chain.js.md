# Snapshot report for `test/optional-chain.js`

The actual snapshot is saved in `optional-chain.js.snap`.

Generated by [AVA](https://ava.li).

## optional chain

    {
      ast: {
        object: {
          name: 'a',
          range: [
            0,
            1,
          ],
          type: 'Identifier',
        },
        optional: true,
        property: {
          name: 'b',
          range: [
            3,
            4,
          ],
          type: 'Identifier',
        },
        range: [
          0,
          4,
        ],
        type: 'MemberExpression',
      },
      result: undefined,
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
            3,
          ],
          type: 'PunctuatorToken',
          value: '?.',
        },
        {
          name: 'b',
          range: [
            3,
            4,
          ],
          type: 'Identifier',
        },
      ],
    }