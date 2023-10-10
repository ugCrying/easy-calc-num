import { numToStr } from './utils.js'
import BigNumber from 'bignumber.js'
export class Ecn {
  /**
   * Easily Calculate Number Class
   * @param {String || Number || BigInt} originVal 原始值
   * @param {String || Number || BigInt} decimals 精度
   */
  constructor(value, decimals = 0) {
    decimals = Number(decimals)
    const num = Number(value)
    const str = numToStr(value, 18)
    const bi = typeof value === 'bigint' ? value : BigInt(parseInt(num))
    // 原始值解析
    this.origin = {
      decimals,
      value,
      num,
      str,
      bi,
    }
    // 真实值解析
    this.bn = new BigNumber(value)

    // this.
  }
  // 千分位展示
  toLocaleString(){
    return this.origin.value.toLocaleString()
  }
  mult(params) {}
  div(params) {}
  plus(params) {}
  minus(params) {}
}
