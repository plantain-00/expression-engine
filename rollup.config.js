import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'dist/browser/index.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'ExpressionEngine',
    file: 'dist/expression-engine.min.js',
    format: 'umd'
  }
}
