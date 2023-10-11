import { numToStr } from './utils.js'
import BigNumber from 'bignumber.js'
export class Ecn {
  /**
   * Easily Calculate Number Class
   * @param {String || Number || BigInt || BigNumber} originVal 原始值
   * @param {String || Number || BigInt} decimals 精度
   */
  constructor(value, decimals = 0) {
    decimals = Number(decimals)

    // 原始值解析
    const num = Number(value)
    const str = numToStr(value)
    const bi = typeof value === 'bigint' ? value : BigInt(parseInt(num))
    const bn = new BigNumber(str)
    this.origin = {
      decimals,
      value,
      num,
      str,
      bi,
      bn,
    }

    // 真实值解析
    this.realBn = bn.dividedBy(BigInt(Math.pow(10, decimals)))
    this.string = numToStr(this.realBn.toString(), 19)
    this.number = Number(this.string)
    this.bigint = BigInt(parseInt(this.string))
  }
  // 千分位展示
  toLocaleString() {
    return this.number.toLocaleString()
  }
  /**
   * @param {String|Number|Ecn} num
   */
  mul(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val)
    return new Ecn(this.realBn.multipliedBy(val.realBn))
  }
  /**
   * @param {String|Number|Ecn} num
   */
  div(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val)
    return new Ecn(this.realBn.dividedBy(val.realBn))
  }
  /**
   * @param {String|Number|Ecn} num
   */
  plus(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val)
    return new Ecn(this.realBn.plus(val.realBn))
  }
  /**
   * @param {String|Number|Ecn} num
   */
  minus(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val)
    return new Ecn(this.realBn.minus(val.realBn))
  }
}
