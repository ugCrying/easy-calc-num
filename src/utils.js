//  获得补位的0和小数点
function padZero(num) {
  let str = "";
  for (let i = 1; i < Math.abs(num); i++) {
    str += "0";
  }
  if (num < 0) return "0." + str;
  else return str + "0";
}

/**
 * 去掉多余的0
 * @param {string} num
 */
function removeExcessZero(num) {
  if (typeof num !== "string") num = numToStr(num);

  if (num[0] === "0" && ![undefined, "."].includes(num[1])) {
    // 前面的0
    let count = 0;
    for (let i = 0; i < num.length; i++) {
      if (num[i] === "0" && ![undefined, "."].includes(num[i + 1])) count++;

      if (num[i] !== "0") break; // 直到读取不是0的字符，停止循环
    }
    if (count > 0) num = num.substring(count);
  }

  if (num.includes(".")) {
    // 小数后面的0
    let partOfinteger = num.substring(0, num.indexOf(".") + 1);
    let partOfDecimal = num.substring(num.indexOf(".") + 1);
    for (let i = partOfDecimal.length - 1; i >= 0; i--) {
      if (partOfDecimal[partOfDecimal.length - 1] === "0") {
        partOfDecimal = partOfDecimal.substring(0, i);
      }
    }
    num = partOfinteger + partOfDecimal;
    if (num.slice(-1) === ".") num = num.substring(0, num.length - 1); // 没有小数位则去掉小数点
  }
  if (["", "-0"].includes(num)) num = "0";
  return num;
}

/**
 * 转换成完整数字-字符串类型
 * @param {String} val 要格式化的值
 * @param {Number} decimals 小数长度
 * @return {String}
 */
export function numToStr(val, decimals) {
  val = String(val);
  let result = "";

  if (val === "NaN") {
    result = "0";
  } else if (val.includes("E-")) {
    result = "0";
  } else if (!val.includes("e")) {
    result = val;
  } else {
    // 包含 e
    let zoomFactor = parseInt(val.substring(val.indexOf("e") + 1)); // 缩放倍数，负数则将小数点前移进行缩小
    //整数部分
    let partOfInt = val.substring(
      parseFloat(val) >= 0 ? 0 : 1,
      val.includes(".") ? val.indexOf(".") : val.indexOf("e")
    );
    // 小数部分
    let partOfDecimal = val.includes(".")
      ? val.substring(val.indexOf(".") + 1, val.indexOf("e"))
      : "";

    if (zoomFactor < 0) {
      // 小数位向左移
      result = padZero(zoomFactor) + partOfInt + partOfDecimal; // 正数
    } else {
      // 小数位向右移
      let arr = (partOfInt + partOfDecimal + padZero(zoomFactor)).split("");
      arr.splice(zoomFactor + 1, 0, ".");
      result = arr.join("");
    }

    if (parseFloat(val) < 0) result = "-" + result; // 负数
  }
  // 小数位控制
  if (result.includes(".")) {
    let partOfinteger = result.substring(0, result.indexOf(".") + 1);
    let partOfDecimal = result.substring(result.indexOf(".") + 1);
    if (decimals !== undefined && partOfDecimal.length > decimals) {
      partOfDecimal = partOfDecimal.substring(0, decimals); // 截取前decimalLength位
    }
    result = partOfinteger + partOfDecimal;
  }

  result = removeExcessZero(result); // 优化:去掉头部多余的0
  return result;
}

/**
 *
 * @param {string} num
 * @param {string} decimals
 */
export function scaleNum(num, decimals) {
  if (typeof num !== "string" || num.includes("e")) num = numToStr(num);
  const isNegative = num.includes("-") || parseFloat(num) < 0;
  if (isNegative) num = num.replace("-", "");
  if (decimals > 0) {
    // 放大
    num = num + padZero(decimals);
    const pointI = num.indexOf(".");
    if (pointI >= 0) {
      // 有小数位
      const pre = num.substring(0, pointI);
      const suf = num.substring(pointI + 1);
      const suf_pre = suf.substring(0, decimals);
      const suf_suf = suf.substring(decimals);
      num = pre + (suf_pre + "." + suf_suf);
    }
  } else if (decimals < 0) {
    // 缩小
    num = padZero(-decimals) + num;
    let pointI = num.indexOf(".");
    if (pointI === -1) pointI = num.length;
    const pre = num.substring(0, pointI);
    const suf = num.substring(pointI + 1);
    const pre_pre = pre.substring(0, pre.length - -decimals);
    const pre_suf = pre.substring(pre.length - -decimals);

    num = pre_pre + "." + pre_suf + suf;
  }
  num = removeExcessZero(num);
  if (isNegative) num = "-" + num;
  return num;
}
