const userModels = require('../models/user');

const register = async query => {
  let res = await userModels.create(query);
  return res
}

const login = async query => {
  let { email, password } = query;
  let res = await userModels.findOne({ where: { email, password }})
  return res
}

const gets = async query => {
  let { offset, limit } = query;  
  let res = await userModels.findAll({ limit });
  return res
}

const update = async query => {
  let { id, params } = query;
  let res = await userModels.update(params, { where: { id }})
  return res
}

module.exports = {
  register,
  login,
  gets,
  update
}