const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
  console.log('upload')
    // let form = new formidable.IncomingForm();
    // form.encoding = 'utf-8'; // 编码
    // 保留扩展名
    // form.keepExtensions = true;
    //文件存储路径 最后要注意加 '/' 否则会被存在public下
    // form.uploadDir = path.join(__dirname, '../../upload/images/');
    let form = form = formidable({
      encoding: 'utf-8',
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../../upload/images/')
    });
    // 解析 formData 数据
    form.parse(req, (err, fields ,files) => {
      console.log(files)
      if(err) return next(err)
      console.log(files)
      let imgPath = files.file.path;
      let imgName = files.file.name;
      console.log(imgName, imgPath);
      // 返回路径和文件名
      res.status(200).json({code: 1, data: { name: imgName, path: imgPath }});
    })
  // try {
    
  // } catch {
  //   res.status(200).json({code: 0, data: '上传失败'});
  // }
}