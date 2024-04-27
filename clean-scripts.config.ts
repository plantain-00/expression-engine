const tsFiles = `"src/**/*.ts"`

export default {
  build: [
    'rimraf dist/',
    {
      back: [
        'tsc -p src/tsconfig.nodejs.json',
        'api-extractor run --local'
      ],
      front: [
        'tsc -p src/tsconfig.browser.json',
        'rollup --config rollup.config.mjs',
        [
          `pegjs -o dist/expression-parser.peg.js --optimize size --format umd src/expression.pegjs`,
          'uglifyjs dist/expression-parser.peg.js -o dist/expression-parser.peg.min.js'
        ],
      ]
    }
  ],
  lint: {
    ts: `eslint ${tsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src/tsconfig.nodejs.json --strict',
    typeCoverageBrowser: 'type-coverage -p src/tsconfig.browser.json --strict'
  },
  test: [
    'ava'
  ],
  fix: `eslint ${tsFiles} --fix`
}
