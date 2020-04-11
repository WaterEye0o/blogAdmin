const messageTags = require('../db/message');
const utils = require('../utils');
const API_STATUS = require('./api_status')

const gets = async (req, res) => {
  let { query } = req;
  let offset = query.page? Number(query.page) : 1;
  let limit = query.size? Number(query.size) : 10;
  let result = await messageTags.gets({ offset, limit });
  if (result) {
    res.status(200).json({
      code: API_STATUS.SUCCESS,
      data: result
    })
  }
}

const add = async (req, res) => {
  let { body } = req;
  let query = {
    ...body,
    createUser: 'admin',
    createTime: new Date().getTime()
  };
  let result = await messageTags.add(query);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '评论成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '评论失败'
    })
  }
}

const del = async (req, res) => {
  let { id } = req.body;
  let result = await messageTags.del(id);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '删除成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '删除失败'
    })
  }
}

module.exports = {
  gets,
  add,
  del
}