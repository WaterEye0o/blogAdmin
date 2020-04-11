const courseModels = require('../models/course');

const gets = async query => {
  let res = await courseModels.findAll();
  return res
}

const add = async query => {
  let res = await courseModels.create(query);
  return res
}

const del = async query => {
  let res = await courseModels.destroy({ where: { id: query }});
  return res
}

const update = async query => {
  let { id, ...params } = query;
  let res = await courseModels.update(params, { where: { id }})
  return res
}

module.exports = {
  gets,
  add,
  del,
  update,
}