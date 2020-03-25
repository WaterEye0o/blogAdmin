const dbUser = require('../db/user');

const gets = async (req, res) => {
  let result = await dbUser.get(req.query);
  res.status(200).json({
    code: 1,
    data: result
  })
};

const register = async (req, res) => {
  let result = await dbUser.register(req.body);
  res.status(200).json({
    code: 1,
    data: result
  })
}

const login = async (req, res) => {
  let result = await dbUser.login(req.body);
  if (result) {
    req.session.reload(err => console.log(err));
    res.status(200).json({
      code: 1,
      data: '登录成功'
    })
  } else {
    res.status(200).json({
      code: 0,
      data: '登录失败, 密码错误'
    })
  }
}

const update = async (req, res) => {
  let { id, ...params } = req.body;
  let result = await dbUser.update({ id, params });
  if (result) {
    res.status(200).json({
      code: 1,
      data: '修改成功'
    })
  } else {
    res.status(200).json({
      code: 0,
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
