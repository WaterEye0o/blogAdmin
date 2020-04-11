const dbTags = require('../db/tags');
const utils = require('../utils');
const API_STATUS = require('./api_status')

const gets = async (req, res) => {
  let { query } = req;
  let offset = query.page? Number(query.page) : 1;
  let limit = query.size? Number(query.size) : 10;
  let result = await dbTags.gets({ offset, limit });
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
  let result = await dbTags.add(query);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '添加标签成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '添加标签失败'
    })
  }
}

const del = async (req, res) => {
  let { id } = req.body;
  let result = await dbTags.del(id);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '删除标签成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '删除标签失败'
    })
  }
}

const update = async (req, res) => {
  let { id } = req.body;
  if (!id) {
    res.json({
      code: API_STATUS.FAIL,
      data: '参数id为必传项'
    });
    return
  };
  let result = await dbTags.update(req.body);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '修改成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '修改失败'
    })
  }
}


module.exports = {
  gets,
  add,
  del,
  update,
}