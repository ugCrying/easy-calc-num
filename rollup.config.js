import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
 input: './index.js',
 output: {
  format: 'esm',
  file: 'dist/ecn.min.js',
 },
 plugins: [
  resolve(),
  terser()
 ],
}
