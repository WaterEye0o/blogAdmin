const fs = require('fs');
const path = require('path');
const version = require('../config').version;

const files = fs.readdirSync(path.join(__dirname, `./v${Number.parseInt(version)}`));

const js_files = files.filter(f => {
  return f.endsWith('.js');
}, files);

const modules = {}

for (let f of js_files) {
  // 截取文件名
  let name = f.slice(0, f.length - 3);
  // 首字母转大写
  name = name.slice(0, 1).toLocaleUpperCase() + name.slice(1);
  modules[name] = require(path.join(__dirname, `./v${Number.parseInt(version)}`, f));
}

module.exports = modules