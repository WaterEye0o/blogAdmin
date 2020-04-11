const courseTags = require('../../db/course');
const utils = require('../../utils');
const API_STATUS = require('../api_status')

const gets = async (req, res) => {
  let result = await courseTags.gets();
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
  let result = await courseTags.add(query);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '添加历程成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '添加历程失败'
    })
  }
}

const del = async (req, res) => {
  let { id } = req.body;
  let result = await courseTags.del(id);
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

const update = async (req, res) => {
  let { id } = req.body;
  if (!id) {
    res.json({
      code: API_STATUS.FAIL,
      data: '参数id为必传项'
    });
    return
  };
  let result = await courseTags.update(req.body);
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