import { numToStr, scaleNum } from "./utils.js";
import Big from "big.js";
export class Ecn {
  /**
   * Easily Calculate Number Class
   * @param {String || Number || BigInt } originVal 原始值
   * @param {String || Number || BigInt} decimals 精度
   */
  constructor(value, decimals = 0) {
    decimals = Number(decimals);
    let str = numToStr(value);
    // 若是小数则转换为整数
    if (str.includes(".")) {
      const d = str.length - 1 - str.indexOf(".");
      decimals += d;
      str = numToStr(Number(str.replace(".", "")));
    }
    if (str === "NaN" || str === "null") str = "0";

    const bi = BigInt(str);
    this.origin = {
      decimals,
      num: Number(str),
      str,
      bi,
    };

    // 真实值解析
    // this.number = num / Math.pow(10, decimals) // 此处会产生精度问题
    this.string = scaleNum(str, -decimals); // 可修复精度问题
    this.number = Number(this.string);
  }

  // 生成容器
  static of(value, decimals) {
    return new Ecn(value, decimals);
  }
  // 映射
  map(callback) {
    return new Ecn(callback(this.string));
  }
  // 输出字符串
  toString() {
    return this.string;
  }
  // 千分位展示
  toLocaleString() {
    return this.number.toLocaleString();
  }
  // 转为字符串类型的整数
  toIntStr() {
    return numToStr(parseInt(this.number));
  }
  // 保留小数位
  keepDecimals(decimals = 2) {
    return numToStr(this.string, decimals);
  }
  // 放大百分比
  toPer() {
    return new Ecn(this.number, -2).string + "%";
  }

  /**
   */
  mul(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val);
    return new Ecn(
      this.origin.bi * val.origin.bi,
      this.origin.decimals + val.origin.decimals
    );
  }
  /**
   */
  div(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val);
    return new Ecn(
      new Big(this.origin.str).div(val.origin.str),
      this.origin.decimals - val.origin.decimals
    );
  }
  /**
   */
  plus(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val);
    const [d1, d2] = [this.origin.decimals, val.origin.decimals];
    if (d1 !== d2) {
      if (d1 > d2) {
        return new Ecn(
          this.origin.bi +
            val.origin.bi * BigInt(numToStr(Math.pow(10, d1 - d2))),
          d1
        );
      } else {
        return new Ecn(
          this.origin.bi * BigInt(numToStr(Math.pow(10, d2 - d1))) +
            val.origin.bi,
          d2
        );
      }
    } else {
      return new Ecn(this.origin.bi + val.origin.bi, d1);
    }
  }
  /**
   */
  minus(val) {
    if (!(val instanceof Ecn)) val = new Ecn(val);
    const [d1, d2] = [this.origin.decimals, val.origin.decimals];
    if (d1 !== d2) {
      if (d1 > d2) {
        return new Ecn(
          this.origin.bi -
            val.origin.bi * BigInt(numToStr(Math.pow(10, d1 - d2))),
          d1
        );
      } else {
        return new Ecn(
          this.origin.bi * BigInt(numToStr(Math.pow(10, d2 - d1))) -
            val.origin.bi,
          d2
        );
      }
    } else {
      return new Ecn(this.origin.bi - val.origin.bi, d1);
    }
  }
}
