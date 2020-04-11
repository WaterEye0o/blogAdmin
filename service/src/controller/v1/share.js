const fs = require('fs')
const path = require('path')
const utils = require('../../utils')
const API_STATUS = require('../api_status')

const FILE_PATH = path.join(__dirname, '../../json', 'index.json')

// 分享内容都保存到json/index.json文件里面
const get = async (req, res) => {
  await fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.json({
        code: API_STATUS.FAIL,
        data: '分享获取失败'
      })
    } else {
      let result = JSON.parse(data)
      result['updateTime'] = utils.format(result['updateTime']);
      res.json({
        code: API_STATUS.SUCCESS,
        data: result
      })
    }   
  })
}

const addOrUpdate = async (req, res) => {
  let { content } = req.body
  let data = {
    content,
    updateTime: new Date().getTime() 
  }
  await fs.writeFile(FILE_PATH, JSON.stringify(data), err => {
    if (err) {
      res.json({
        code: API_STATUS.FAIL,
        data: '分享保存失败'
      })
    } else {
      res.json({
        code: API_STATUS.SUCCESS,
        data: '分享保存成功'
      })
    }
  })
}

module.exports = {
  get,
  addOrUpdate
}