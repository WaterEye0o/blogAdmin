// node crypto加密包
const crypto = require('crypto');
const config = require('../config');
// node commet 时间格式化
const moment = require('moment');

const _ = require('lodash');

// md5 + secretKey
function setMD5Encryption(str) {
  return crypto.createHmac('md5', 'abc').update(str).digest('hex');
};

// 时间戳 转换为日期 
function format(timestamp, str = 'YYYY-MM-DD HH:mm:ss') {
  return moment(Number(timestamp)).format(str)
};

module.exports = {
  setMD5Encryption,
  format
}