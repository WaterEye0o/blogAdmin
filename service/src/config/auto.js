const path = require('path');
const fs = require('fs');

/**
 * 目的通过node命令传入的参数 自动在指定的文件夹下创建对应名称的.js文件
 * 如在a文件夹下创建a.js文件 
 *  node a.js a
 * 
 */

/** 
 * 通过process.argv.slice(2) node a.js abc => ['abc'] 多个以空格分割
 * 可以获取到我们node命令上传入的参数以数组的形式返回
 * 
*/
const params = process.argv.slice(2);
// console.log(params)

/**
 * 指定文件夹通过path获取目录地址
 * 
 */
const dirs = [path.join(__dirname, '../models'), path.join(__dirname, '../db'), path.join(__dirname, '../controller')];
// console.log(dirs)

for (let o of params) {
  // 扩展为js文件
  let file = o + '.js';
  for (let n of dirs) {
    // 同步创建文件并写入 => 异步可以传入回调函数监听
    fs.writeFileSync(`${n}/${file}`, '')
  }
}