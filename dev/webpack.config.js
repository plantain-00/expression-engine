module.exports = {
  mode: process.env.NODE_ENV,
  entry: './dev/intellisense-ui',
  output: {
    path: __dirname,
    filename: 'index.bundle.js'
  }
}
