const tagsModels = require('../models/tags');

const gets = async query => {
  let { offset, limit } = query;
  let res = await tagsModels.findAll({ limit });
  return res
}

const add = async query => {
  let res = await tagsModels.create(query);
  return res
}

const del = async query => {
  let res = await tagsModels.destroy({ where: { id: query }});
  return res
}

const update = async query => {
  let { id, ...params } = query;
  let res = await tagsModels.update(params, { where: { id }})
  return res
}

module.exports = {
  gets,
  add,
  del,
  update,
}