const userModels = require('../models/user');
const utils = require('../utils');

const register = async query => {
  query.password = utils.setMD5Encryption(query.password);
  let res = await userModels.create(query);
  return res
}

const login = async query => {
  let { email, password } = query;
  password = utils.setMD5Encryption(password);
  let res = await userModels.findOne({ where: { email, password }})
  return res
}

const get = async query => {
  let offset = query.page? Number(query.page) : 1;
  let limit = query.length? Number(query.length) : 10;
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
  get,
  update
}