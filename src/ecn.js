import { numToStr } from './utils.js'
export class Ecn {
  /**
   * Easily Calculate Number Class
   * @param {String || Number || BigInt } originVal 原始值
   * @param {String || Number || BigInt} decimals 精度
   */
  constructor(value, decimals = 0) {
    decimals = Number(decimals)
    let str = numToStr(value)
    // 若是小数则转换为整数
    if (str.includes('.')) {
      const d = str.length - 1 - str.indexOf('.')
      decimals += d
      str = numToStr(Number(str.replace('.', '')))
    }
    const num = Number(str)
    const bi = BigInt(str)
    this.origin = {
      decimals,
      num,
      str,
      bi,
    }

    // 真实值解析
    this.number = num / Math.pow(10, decimals)
    this.string = numToStr(this.number)
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
    return new Ecn(
      this.origin.bi * val.origin.bi,
      this.origin.decimals + val.origin.decimals
    )
  }
  /**
   * @param {String|Number|Ecn} num
   */
  div(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val)
    return new Ecn(
      this.origin.bi / val.origin.bi,
      this.origin.decimals - val.origin.decimals
    )
  }
  /**
   * @param {String|Number|Ecn} num
   */
  plus(val) {
    // if (!(val instanceof Ecn)) val = new Ecn(val)
    // return new Ecn(this.realBn.plus(val.realBn))
  }
  /**
   * @param {String|Number|Ecn} num
   */
  minus(val) {
    // if (!(val instanceof Ecn)) val = new Ecn(val)
    // return new Ecn(this.realBn.minus(val.realBn))
  }
}
