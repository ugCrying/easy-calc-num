import BigNumber from 'bignumber.js'

// 获得补位的0和小数点
function padZero(num) {
  let str = ''
  for (let i = 1; i < Math.abs(num); i++) {
    str += '0'
  }
  if (num < 0) return '0.' + str
  else return str + '0'
}

/**
 * 转换成完整数字-字符串类型
 * @param {String} val 要格式化的值
 * @param {Number} decimals 小数长度
 * @return {String}
 */
export const numToStr = (val, decimals) => {
  if (val instanceof BigNumber) val = val.toString()
  else val = String(val)
  let result = ''

  if (!val.includes('e')) {
    result = val
  } else {
    // 包含 e
    let zoomFactor = parseInt(val.substring(val.indexOf('e') + 1)) // 缩放倍数，负数则将小数点前移进行缩小
    let partOfInt = val.substring(
      parseFloat(val) >= 0 ? 0 : 1,
      val.includes('.') ? val.indexOf('.') : val.indexOf('e')
    ) //整数部分
    let partOfDecimal = val.includes('.')
      ? val.substring(val.indexOf('.') + 1, val.indexOf('e'))
      : '' // 小数部分

    if (zoomFactor < 0) {
      // 小数位向左移
      result = padZero(zoomFactor) + partOfInt + partOfDecimal // 正数
    } else {
      // 小数位向右移
      let arr = (partOfInt + partOfDecimal + padZero(zoomFactor)).split('')
      arr.splice(zoomFactor + 1, 0, '.')
      result = arr.join('')
    }

    if (parseFloat(val) < 0) result = '-' + result // 负数

    // console.log('val:', val, ' 缩放倍数:', zoomFactor, ' 整数部分：', partOfInt, ' 小数部分:', partOfDecimal, ' 输出:', result);
  }
  // 小数位控制
  if (result.includes('.')) {
    let partOfinteger = result.substring(0, result.indexOf('.') + 1)
    let partOfDecimal = result.substring(result.indexOf('.') + 1)
    if (decimals !== undefined && partOfDecimal.length > decimals) {
      partOfDecimal = partOfDecimal.substring(0, decimals) // 截取前decimalLength位
    }
    // 小数后面的0去掉
    for (let i = partOfDecimal.length - 1; i >= 0; i--) {
      if (partOfDecimal[partOfDecimal.length - 1] === '0') {
        partOfDecimal = partOfDecimal.substring(0, i)
        // partOfDecimal = partOfDecimal.substring(0, i - 1)
      }
    }
    result = partOfinteger + partOfDecimal
    if (result.slice(-1) === '.')
      result = result.substring(0, result.length - 1) // 没有小数位则去掉小数点
    if (['', '-0'].includes(result)) result = '0'
  }
  // console.log('输入:', val, ' 输出:', result);
  return result
}
