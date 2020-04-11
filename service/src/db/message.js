const messageModels = require('../models/message');
const userModel = require('../models/user');

messageModels.belongsTo(userModel, { foreignKey: 'userid', targetKey: 'id', as: 'user'});

const gets = async query => {  
  let { offset, limit } = query;
  let res = await messageModels.findAll({ include: [{ model: userModel, as: 'user' }],
  limit })
  return res
}

const add = async query => {
  let res = await messageModels.create(query);
  return res
}

const del = async query => {
  let res = await messageModels.destroy({ where: { id: query }});
  return res
}

module.exports = {
  gets,
  add,
  del
}