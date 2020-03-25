// node crypto加密包
const crypto = require('crypto');
const config = require('../config');

// md5 + secretKey
function setMD5Encryption(str) {
  return crypto.createHmac('md5', 'abc').update(str).digest('hex');
}


module.exports = {
  setMD5Encryption
}