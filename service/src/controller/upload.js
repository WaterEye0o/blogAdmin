const formidable = require('formidable');
const path = require('path');
// const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    // enctype是multipart/form-data, name是file
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    form.keepExtensions = true;
    // 文件存储路径 最后要注意加 '/' 否则会被存在upload下
    let prefix = path.join(__dirname, '../../upload/images/');
    form.uploadDir = prefix;
    // 解析 formData 数据
    form.parse(req, (err, fields ,files) => {
      if(err) return next(err)
      let imgName = files.file.name;
      let imgPath = files.file.path;
      // 返回路径和文件名
      res.status(200).json({code: 1, data: { name: imgName, path: imgPath }});
    })
  } catch {
    res.status(200).json({code: 0, data: '上传失败'});
  }
}