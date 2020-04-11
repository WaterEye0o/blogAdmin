const dbUser = require('../db/user');
const utils = require('../utils');
const API_STATUS = require('./api_status')

const gets = async (req, res) => {
  let { query } = req;
  let offset = query.page? Number(query.page) : 1;
  let limit = query.size? Number(query.size) : 10;
  let result = await dbUser.gets({ offset, limit });
  res.status(200).json({
    code: API_STATUS.SUCCESS,
    data: result
  })
};

const register = async (req, res) => {
  let { body } = req;
  let query = {
    ...body,
    password: utils.setMD5Encryption(body.password)
  };
  let result = await dbUser.register(query);
  res.status(200).json({
    code: API_STATUS.SUCCESS,
    data: result
  })
}

const login = async (req, res) => {
  let { body } = req;
  let query = {
    ...body,
    password: utils.setMD5Encryption(body.password)
  };
  let result = await dbUser.login(query);
  if (result) {
    req.session.reload(err => console.log(err));
    req.session.user = result;
    req.session.isLogin = 1;
    res.status(200).json({
      code: API_STATUS.SUCCESS,
      data: result
    })
  } else {
    res.status(200).json({
      code: API_STATUS.FAIL,
      data: '登录失败, 密码错误'
    })
  }
}

const update = async (req, res) => {
  let { id, ...params } = req.body;
  let result = await dbUser.update({ id, params });
  if (result) {
    res.status(200).json({
      code: API_STATUS.SUCCESS,
      data: '修改成功'
    })
  } else {
    res.status(200).json({
      code: API_STATUS.FAIL,
      data: '修改失败'
    })
  }
}

module.exports = {
  gets,
  register,
  login,
  update
};
