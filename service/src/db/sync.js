// 同步数据库表名和models模型名

const sequelize = require('./index.js').sequelize;
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, '../models'));
const js_files = files.filter(f => {
  return f.endsWith('.js');
}, files);
// console.log(js_files);
for (var f of js_files) {
  console.log(`import model from file ${f}...`);
  var name = f.substring(0, f.length - 3);
  module.exports[name] = require(path.join(__dirname, '../models', f));
}
sequelize.sync({ force: true });
