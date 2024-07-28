

import { v4 as uuidv4 } from 'uuid'; // 使用uuid库生成唯一id

/** 当前时间:默认东八区 24小时制 */
export function customMoment(timezone: string = 'Asia/Shanghai', language: string = 'zh-cn') {
  // 巴黎（'Europe/Paris'）和法语 Locale
  const moment = require('moment-timezone');
  const now = moment();
  const res = now.tz(timezone).locale(language).format('YYYY-MM-DD HH:mm:ss')
  return res;

  // moment().format("YYYY-MM-DD") // 格式化显示当前时间
  // `${moment().subtract("month", +1).format("YYYY-MM")}-01` // 上一个月的1号
  // `${moment().add("month", -1).format("YYYY-MM")}-01`  // 还是上一个月1号
  // let M = `${moment().format("YYYY-MM")}-01` // 本月一号
  // moment(M).add("days", -1).format("YYYY-MM-DD") // 上一个月月底
  // moment().startOf("year").format("YYYY-MM-DD")  // 本年的的开始日期，（"2019-01-01"）
  // moment().endOf("year").format("YYYY-MM-DD")  // 本年的的结束日期，（"2019-12-31"）
  // // moment 转成时间戳
  // moment().valueOf()
  // // 时间戳 转 moment
  // moment(string).format()

  // // 解决Moment格式化时间出现时区差的问题
  // // `utcOffset()` 接收数字，时间偏移量，单位：分钟
  // // 北京时间东八区时间，比零时区早8个小时（480分钟），所以应该加上480分钟
  // Moment(date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
}


/** uuid v4随机生成 */
export function uuidWithoutHyphen(): string {
  // 时间戳：UUID的版本1（基于时间的UUID）包含了创建UUID的精确时间信息，这使得在不同地方生成UUID的可能性非常低。
  // MAC地址：UUID的版本1还包括生成UUID的机器的MAC地址。这也有助于确保唯一性。
  // 随机数：UUID的版本4（随机UUID）是完全随机生成的，因此也具有高度的唯一性。

  const uuid = uuidv4().replace(/-/g, '').toUpperCase(); // 生成UUID并去掉中划线
  return uuid;
}
