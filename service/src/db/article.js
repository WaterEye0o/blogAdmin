const articleModels = require('../models/article');

const gets = async query => {
  let { offset, limit } = query;
  let res = await articleModels.findAll({ limit });
  return res
}

const add = async query => {
  let res = await articleModels.create(query);
  return res
}

const del = async query => {
  let res = await articleModels.destroy({ where: { id: query }});
  return res
}

const update = async query => {
  let { id, ...params } = query;
  let res = await articleModels.update(params, { where: { id }})
  return res
}

const get = async query => {
  let res = await articleModels.findOne({ where: { id: query }});
  return res
}

module.exports = {
  gets,
  add,
  del,
  update,
  get
}