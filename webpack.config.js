import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// const resolve = path.resolve

export default {
  entry: '/index.js',
  // target: 'node',
  mode: 'production', // 设置为 production 模式，启用压缩等优化
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ecn.min.js',
    // library: {
    //   type: 'module',
    // },
  },

  optimization: {
    minimize: false,
  },
}
