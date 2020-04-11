const dbArtcle = require('../../db/article');
const utils = require('../../utils');
const API_STATUS = require('../api_status')

const gets = async (req, res) => {
  let { query } = req;
  let offset = query.page? Number(query.page) : 1;
  let limit = query.size? Number(query.size) : 10;
  let result = await dbArtcle.gets({ offset, limit });
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
    comments: 0,
    visits: 0,
    likes: 0,
    createTime: new Date().getTime()
  };
  let result = await dbArtcle.add(query);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '添加文章成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '添加文章失败'
    })
  }
}

const del = async (req, res) => {
  let { id } = req.body;
  let result = await dbArtcle.del(id);
  if (result) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '删除文章成功'
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '删除文章失败'
    })
  }
}

const update = async (req, res) => {
  let { id } = req.body;
  if (!id) {
    res.json({
      code: API_STATUS.SUCCESS,
      data: '参数id为必传项'
    });
    return
  };
  let result = await dbArtcle.update(req.body);
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

const get = async (req, res) => {
  let { id } = req.query;
  let result = await dbArtcle.get(id);
  if (result) {
    result['createTime'] = utils.format(result['createTime']);
    res.json({
      code: API_STATUS.SUCCESS,
      data: result
    })
  } else {
    res.json({
      code: API_STATUS.FAIL,
      data: '查询详情失败'
    })
  }
}

const likes = async (req, res) => {
  // type 默认值为1, 1为点赞 0为取消
  let { id, type = 1 } = req.body;
  if (!id) {
    res.json({
      code: API_STATUS.FAIL,
      data: '参数id为必传项'
    });
    return
  };
  let result = await dbArtcle.likes({ id, type });
  if (result) {
    type == 1
    ? res.json({
      code: API_STATUS.SUCCESS,
      data: '点赞成功'
    })
    : res.json({
      code: API_STATUS.SUCCESS,
      data: '取消成功'
    })
  }
}

module.exports = {
  gets,
  add,
  del,
  update,
  get,
  likes
}